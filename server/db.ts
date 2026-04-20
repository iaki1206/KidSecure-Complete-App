import { eq, and, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import {
  InsertUser, users,
  graphicalPasswords, InsertGraphicalPassword, GraphicalPassword,
  loginAttempts, InsertLoginAttempt,
  usabilityTests, InsertUsabilityTest
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Create the SQLite database instance lazily
export async function getDb() {
  if (!_db) {
    try {
      // Use DATABASE_PATH env var (for cloud/Railway) or default to local ./data/
      const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'kidsecure.db');
      const dataDir = path.dirname(dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const sqlite = new Database(dbPath);

      // Enable WAL mode for better concurrency
      sqlite.pragma('journal_mode = WAL');

      _db = drizzle(sqlite);

      // Create tables if they don't exist
      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          openId TEXT NOT NULL UNIQUE,
          name TEXT,
          email TEXT,
          loginMethod TEXT,
          role TEXT NOT NULL DEFAULT 'user',
          createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
          updatedAt INTEGER NOT NULL DEFAULT (unixepoch()),
          lastSignedIn INTEGER NOT NULL DEFAULT (unixepoch())
        );

        CREATE TABLE IF NOT EXISTS graphical_passwords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          username TEXT NOT NULL UNIQUE,
          passwordHash TEXT NOT NULL,
          salt TEXT NOT NULL,
          selectedImages TEXT NOT NULL,
          failedAttempts INTEGER NOT NULL DEFAULT 0,
          lockedUntil INTEGER,
          isActive INTEGER NOT NULL DEFAULT 1,
          securityQuestion1 TEXT,
          securityAnswer1Hash TEXT,
          securityQuestion2 TEXT,
          securityAnswer2Hash TEXT,
          createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
          updatedAt INTEGER NOT NULL DEFAULT (unixepoch())
        );

        CREATE TABLE IF NOT EXISTS login_attempts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          success INTEGER NOT NULL,
          attemptedAt INTEGER NOT NULL DEFAULT (unixepoch()),
          sessionInfo TEXT
        );

        CREATE TABLE IF NOT EXISTS usability_tests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          testType TEXT NOT NULL,
          success INTEGER NOT NULL,
          completionTime INTEGER NOT NULL,
          attempts INTEGER NOT NULL DEFAULT 1,
          notes TEXT,
          createdAt INTEGER NOT NULL DEFAULT (unixepoch())
        );
      `);

      console.log("[Database] SQLite database initialized at:", dbPath);
    } catch (error) {
      console.error("[Database] Failed to initialize SQLite:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    // For SQLite, use insert or replace pattern
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: values.name,
        email: values.email,
        loginMethod: values.loginMethod,
        lastSignedIn: values.lastSignedIn || new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Graphical Password Functions

export async function createGraphicalPassword(data: InsertGraphicalPassword): Promise<GraphicalPassword> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = db.insert(graphicalPasswords).values(data).returning();
  const inserted = await result;

  if (!inserted[0]) {
    throw new Error("Failed to retrieve inserted graphical password");
  }

  return inserted[0];
}

export async function getGraphicalPasswordByUsername(username: string): Promise<GraphicalPassword | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(graphicalPasswords).where(eq(graphicalPasswords.username, username)).limit(1);
  return result[0];
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select({ id: graphicalPasswords.id }).from(graphicalPasswords).where(eq(graphicalPasswords.username, username)).limit(1);
  return result.length > 0;
}

export async function incrementFailedAttempts(username: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existing = await getGraphicalPasswordByUsername(username);
  if (!existing) return;

  const newFailedAttempts = (existing.failedAttempts || 0) + 1;
  let lockedUntil = existing.lockedUntil;

  // Lock account for 5 minutes after 3 failed attempts
  if (newFailedAttempts >= 3) {
    lockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  }

  await db.update(graphicalPasswords)
    .set({
      failedAttempts: newFailedAttempts,
      lockedUntil: lockedUntil
    })
    .where(eq(graphicalPasswords.username, username));
}

export async function resetFailedAttempts(username: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(graphicalPasswords)
    .set({
      failedAttempts: 0,
      lockedUntil: null
    })
    .where(eq(graphicalPasswords.username, username));
}

export async function isAccountLocked(username: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const account = await getGraphicalPasswordByUsername(username);
  if (!account || !account.lockedUntil) return false;

  const now = new Date();
  if (account.lockedUntil > now) {
    return true;
  }

  // Unlock if time has passed
  await resetFailedAttempts(username);
  return false;
}

// Login Attempt Logging

export async function logLoginAttempt(data: InsertLoginAttempt): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(loginAttempts).values(data);
}

export async function getLoginAttemptsByUsername(username: string, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select()
    .from(loginAttempts)
    .where(eq(loginAttempts.username, username))
    .orderBy(loginAttempts.attemptedAt)
    .limit(limit);
}

// Usability Testing Functions

export async function recordUsabilityTest(data: InsertUsabilityTest): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(usabilityTests).values(data);
}

export async function getUsabilityTestStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const allTests = await db.select().from(usabilityTests);

  const stats = {
    registration: {
      total: 0,
      successful: 0,
      avgTime: 0,
      avgAttempts: 0
    },
    login: {
      total: 0,
      successful: 0,
      avgTime: 0,
      avgAttempts: 0
    },
    memorability: {
      total: 0,
      successful: 0,
      avgTime: 0,
      avgAttempts: 0
    }
  };

  allTests.forEach(test => {
    const type = test.testType;
    stats[type].total++;
    if (test.success) stats[type].successful++;
    stats[type].avgTime += test.completionTime;
    stats[type].avgAttempts += test.attempts;
  });

  // Calculate averages
  Object.keys(stats).forEach(key => {
    const type = key as keyof typeof stats;
    if (stats[type].total > 0) {
      stats[type].avgTime = Math.round(stats[type].avgTime / stats[type].total);
      stats[type].avgAttempts = stats[type].avgAttempts / stats[type].total;
    }
  });

  return stats;
}
