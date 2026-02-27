import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extended for graphical password authentication system.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Graphical password authentication table
 * Stores child-friendly graphical passwords with security features
 */
export const graphicalPasswords = sqliteTable("graphical_passwords", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  username: text("username").notNull().unique(),
  // Store hashed password (bcrypt hash of selected image IDs concatenated)
  passwordHash: text("passwordHash").notNull(),
  // Store salt used for hashing
  salt: text("salt").notNull(),
  // Store the 4 selected image IDs as JSON array for verification
  // Format: ["farm-cow", "wild-lion", "sea-dolphin", "bird-parrot"]
  selectedImages: text("selectedImages", { mode: "json" }).$type<string[]>().notNull(),
  // Failed login attempts counter
  failedAttempts: integer("failedAttempts").default(0).notNull(),
  // Lockout timestamp (null if not locked)
  lockedUntil: integer("lockedUntil", { mode: "timestamp" }),
  // Account status
  isActive: integer("isActive", { mode: "boolean" }).default(true).notNull(),
  // Security questions for password recovery (child-friendly questions)
  securityQuestion1: text("securityQuestion1"),
  securityAnswer1Hash: text("securityAnswer1Hash"),
  securityQuestion2: text("securityQuestion2"),
  securityAnswer2Hash: text("securityAnswer2Hash"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type GraphicalPassword = typeof graphicalPasswords.$inferSelect;
export type InsertGraphicalPassword = typeof graphicalPasswords.$inferInsert;

/**
 * Login attempts log for security monitoring
 */
export const loginAttempts = sqliteTable("login_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  success: integer("success", { mode: "boolean" }).notNull(),
  attemptedAt: integer("attemptedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  // Store IP address or session identifier for security analysis
  sessionInfo: text("sessionInfo"),
});

export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type InsertLoginAttempt = typeof loginAttempts.$inferInsert;

/**
 * Usability test results for academic evaluation
 */
export const usabilityTests = sqliteTable("usability_tests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  testType: text("testType", { enum: ["registration", "login", "memorability"] }).notNull(),
  // Success or failure
  success: integer("success", { mode: "boolean" }).notNull(),
  // Time taken in milliseconds
  completionTime: integer("completionTime").notNull(),
  // Number of attempts
  attempts: integer("attempts").default(1).notNull(),
  // Additional notes or observations
  notes: text("notes"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type UsabilityTest = typeof usabilityTests.$inferSelect;
export type InsertUsabilityTest = typeof usabilityTests.$inferInsert;
