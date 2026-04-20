import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Auto-create tables so the DB is always ready on first boot (local or cloud)
function ensureDatabase() {
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "kidsecure.db");
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      openId TEXT NOT NULL UNIQUE,
      name TEXT, email TEXT, loginMethod TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
      updatedAt INTEGER NOT NULL DEFAULT (unixepoch()),
      lastSignedIn INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS graphical_passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      username TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL, salt TEXT NOT NULL,
      selectedImages TEXT NOT NULL,
      failedAttempts INTEGER NOT NULL DEFAULT 0,
      lockedUntil INTEGER, isActive INTEGER NOT NULL DEFAULT 1,
      securityQuestion1 TEXT, securityAnswer1Hash TEXT,
      securityQuestion2 TEXT, securityAnswer2Hash TEXT,
      createdAt INTEGER NOT NULL DEFAULT (unixepoch()),
      updatedAt INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL, success INTEGER NOT NULL,
      attemptedAt INTEGER NOT NULL DEFAULT (unixepoch()),
      sessionInfo TEXT
    );
    CREATE TABLE IF NOT EXISTS usability_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      testType TEXT NOT NULL, success INTEGER NOT NULL,
      completionTime INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 1,
      notes TEXT,
      createdAt INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `);

  sqlite.close();
  console.log("[Database] SQLite ready at:", dbPath);
}

async function startServer() {
  // Ensure DB tables exist before serving any requests
  ensureDatabase();

  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
