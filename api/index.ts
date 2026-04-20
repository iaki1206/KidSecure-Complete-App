import "dotenv/config";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

// /tmp is writable on Vercel serverless; falls back to local data/ for other envs
const DB_PATH = process.env.DATABASE_PATH ||
  (process.env.VERCEL ? "/tmp/kidsecure.db" : path.join(process.cwd(), "data", "kidsecure.db"));

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, openId TEXT NOT NULL UNIQUE,
      name TEXT, email TEXT, loginMethod TEXT, role TEXT NOT NULL DEFAULT 'user',
      createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
      updatedAt INTEGER NOT NULL DEFAULT (unixepoch()),
      lastSignedIn INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS graphical_passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL,
      username TEXT NOT NULL UNIQUE, passwordHash TEXT NOT NULL, salt TEXT NOT NULL,
      selectedImages TEXT NOT NULL, failedAttempts INTEGER NOT NULL DEFAULT 0,
      lockedUntil INTEGER, isActive INTEGER NOT NULL DEFAULT 1,
      securityQuestion1 TEXT, securityAnswer1Hash TEXT,
      securityQuestion2 TEXT, securityAnswer2Hash TEXT,
      createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
      updatedAt INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL,
      success INTEGER NOT NULL, attemptedAt INTEGER NOT NULL DEFAULT (unixepoch()),
      sessionInfo TEXT
    );
    CREATE TABLE IF NOT EXISTS usability_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL,
      testType TEXT NOT NULL, success INTEGER NOT NULL,
      completionTime INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 1,
      notes TEXT, createdAt INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `);
  sqlite.close();
}

ensureDb();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));

export default app;
