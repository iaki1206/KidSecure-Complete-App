import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  createGraphicalPassword,
  getGraphicalPasswordByUsername,
  checkUsernameExists,
  incrementFailedAttempts,
  resetFailedAttempts,
  isAccountLocked,
  logLoginAttempt,
  getLoginAttemptsByUsername,
  recordUsabilityTest,
  getUsabilityTestStats
} from "./db";
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  validateUsername,
  validateImageSelection,
  generateDecoyRounds
} from "./security";
import { getRandomAnimals, ANIMALS, getAnimalById } from "../shared/animals";
import { SECURITY_QUESTIONS } from "../shared/securityQuestions";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Graphical Password Authentication
  graphicalAuth: router({
    // Check if username is available
    checkUsername: publicProcedure
      .input(z.object({ username: z.string() }))
      .mutation(async ({ input }) => {
        const validation = validateUsername(input.username);
        if (!validation.valid) {
          return { available: false, error: validation.error };
        }

        const exists = await checkUsernameExists(input.username);
        return { available: !exists, error: exists ? "Username already taken" : undefined };
      }),

    // Register a new graphical password
    register: publicProcedure
      .input(z.object({
        username: z.string(),
        selectedImages: z.array(z.string()).length(4),
        userId: z.number().optional(),
        startTime: z.number(), // Timestamp when registration started
        securityQuestion1: z.string().optional(),
        securityAnswer1: z.string().optional(),
        securityQuestion2: z.string().optional(),
        securityAnswer2: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Validate username
        const usernameValidation = validateUsername(input.username);
        if (!usernameValidation.valid) {
          return { success: false, error: usernameValidation.error };
        }

        // Check if username exists
        const exists = await checkUsernameExists(input.username);
        if (exists) {
          return { success: false, error: "Username already taken" };
        }

        // Validate image selection
        const imageValidation = validateImageSelection(input.selectedImages);
        if (!imageValidation.valid) {
          return { success: false, error: imageValidation.error };
        }

        // Generate salt and hash password
        const salt = generateSalt();
        const passwordHash = hashPassword(input.selectedImages, salt);

        // Hash security answers if provided
        const securityAnswer1Hash = input.securityAnswer1
          ? hashPassword([input.securityAnswer1.toLowerCase().trim()], salt)
          : undefined;
        const securityAnswer2Hash = input.securityAnswer2
          ? hashPassword([input.securityAnswer2.toLowerCase().trim()], salt)
          : undefined;

        // Create graphical password entry
        await createGraphicalPassword({
          userId: input.userId || 0,
          username: input.username,
          passwordHash,
          salt,
          selectedImages: input.selectedImages,
          failedAttempts: 0,
          lockedUntil: null,
          isActive: true,
          securityQuestion1: input.securityQuestion1,
          securityAnswer1Hash,
          securityQuestion2: input.securityQuestion2,
          securityAnswer2Hash,
        });

        // Record usability test data
        const completionTime = Date.now() - input.startTime;
        await recordUsabilityTest({
          username: input.username,
          testType: "registration",
          success: true,
          completionTime,
          attempts: 1,
          notes: "Successful registration",
        });

        return { success: true };
      }),

    // Login with graphical password
    login: publicProcedure
      .input(z.object({
        username: z.string(),
        selectedImages: z.array(z.string()).length(4),
        startTime: z.number(), // Timestamp when login started
        sessionInfo: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if account is locked
        const locked = await isAccountLocked(input.username);
        if (locked) {
          return {
            success: false,
            error: "Account is locked due to too many failed attempts. Please try again in 5 minutes.",
            locked: true
          };
        }

        // Get stored password
        const account = await getGraphicalPasswordByUsername(input.username);
        if (!account) {
          // Log failed attempt
          await logLoginAttempt({
            username: input.username,
            success: false,
            sessionInfo: input.sessionInfo,
          });
          return { success: false, error: "Invalid username or password" };
        }

        // Verify password
        const isValid = verifyPassword(input.selectedImages, account.passwordHash, account.salt);

        if (isValid) {
          // Reset failed attempts
          await resetFailedAttempts(input.username);

          // Log successful attempt
          await logLoginAttempt({
            username: input.username,
            success: true,
            sessionInfo: input.sessionInfo,
          });

          // Record usability test data
          const completionTime = Date.now() - input.startTime;
          await recordUsabilityTest({
            username: input.username,
            testType: "login",
            success: true,
            completionTime,
            attempts: 1,
            notes: "Successful login",
          });

          return { success: true, username: input.username };
        } else {
          // Increment failed attempts
          await incrementFailedAttempts(input.username);

          // Log failed attempt
          await logLoginAttempt({
            username: input.username,
            success: false,
            sessionInfo: input.sessionInfo,
          });

          // Check remaining attempts
          const updatedAccount = await getGraphicalPasswordByUsername(input.username);
          const remainingAttempts = 3 - (updatedAccount?.failedAttempts || 0);

          return {
            success: false,
            error: "Invalid password",
            remainingAttempts: Math.max(0, remainingAttempts)
          };
        }
      }),

    // Get random animals for grid display (used by registration/recovery)
    getGridAnimals: publicProcedure
      .input(z.object({
        count: z.number().min(1).max(25).default(25),
        excludeIds: z.array(z.string()).optional(),
      }))
      .query(({ input }) => {
        return getRandomAnimals(input.count, input.excludeIds || []);
      }),

    // Get login grid: 25 animals that INCLUDE the correct answer for this round
    getLoginGrid: publicProcedure
      .input(z.object({
        username: z.string(),
        round: z.number().min(0).max(3), // 0-indexed round number
      }))
      .query(async ({ input }) => {
        const account = await getGraphicalPasswordByUsername(input.username);
        if (!account || !account.selectedImages) {
          // If user not found, return random animals (don't reveal user existence)
          return getRandomAnimals(25);
        }

        const selectedImages = account.selectedImages as string[];
        const correctAnimalId = selectedImages[input.round];
        const correctAnimal = getAnimalById(correctAnimalId);

        if (!correctAnimal) {
          return getRandomAnimals(25);
        }

        // Get 24 random decoy animals (excluding the correct one)
        const decoys = getRandomAnimals(24, [correctAnimalId]);

        // Combine correct animal with decoys and shuffle
        const grid = [correctAnimal, ...decoys];
        // Fisher-Yates shuffle for proper randomization
        for (let i = grid.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [grid[i], grid[j]] = [grid[j], grid[i]];
        }

        return grid;
      }),

    // Get all animals (for reference)
    getAllAnimals: publicProcedure
      .query(() => {
        return ANIMALS;
      }),

    // Generate decoy rounds for login
    getDecoyRounds: publicProcedure
      .query(() => {
        return {
          decoyRounds: generateDecoyRounds(4, 1),
          totalRounds: 4
        };
      }),

    // Get login history for a user (for testing/analysis)
    getLoginHistory: publicProcedure
      .input(z.object({ username: z.string() }))
      .query(async ({ input }) => {
        return await getLoginAttemptsByUsername(input.username, 20);
      }),

    // Get security questions for password recovery
    getSecurityQuestions: publicProcedure
      .query(() => {
        return SECURITY_QUESTIONS;
      }),

    // Get the specific security questions a user set during registration
    getUserSecurityQuestions: publicProcedure
      .input(z.object({ username: z.string() }))
      .query(async ({ input }) => {
        const account = await getGraphicalPasswordByUsername(input.username);
        if (!account) {
          return { found: false, question1: null, question2: null };
        }
        return {
          found: true,
          question1: account.securityQuestion1 || null,
          question2: account.securityQuestion2 || null,
          hasSecurityQuestions: !!(account.securityQuestion1 && account.securityQuestion2),
        };
      }),

    // Verify security answers for password recovery
    verifySecurityAnswers: publicProcedure
      .input(z.object({
        username: z.string(),
        answer1: z.string(),
        answer2: z.string(),
      }))
      .mutation(async ({ input }) => {
        const account = await getGraphicalPasswordByUsername(input.username);
        if (!account || !account.securityAnswer1Hash || !account.securityAnswer2Hash) {
          return { success: false, error: "Account not found or no security questions set" };
        }

        // Verify both answers (case-insensitive)
        const answer1Hash = hashPassword([input.answer1.toLowerCase().trim()], account.salt);
        const answer2Hash = hashPassword([input.answer2.toLowerCase().trim()], account.salt);

        const answer1Valid = verifyPassword([input.answer1.toLowerCase().trim()], account.securityAnswer1Hash, account.salt);
        const answer2Valid = verifyPassword([input.answer2.toLowerCase().trim()], account.securityAnswer2Hash, account.salt);

        if (answer1Valid && answer2Valid) {
          return { success: true };
        } else {
          return { success: false, error: "Incorrect security answers" };
        }
      }),

    // Reset password after security verification
    resetPassword: publicProcedure
      .input(z.object({
        username: z.string(),
        newSelectedImages: z.array(z.string()).length(4),
      }))
      .mutation(async ({ input }) => {
        const account = await getGraphicalPasswordByUsername(input.username);
        if (!account) {
          return { success: false, error: "Account not found" };
        }

        // Validate image selection
        const imageValidation = validateImageSelection(input.newSelectedImages);
        if (!imageValidation.valid) {
          return { success: false, error: imageValidation.error };
        }

        // Generate new salt and hash
        const salt = generateSalt();
        const passwordHash = hashPassword(input.newSelectedImages, salt);

        // Update password in database
        const db = await import("./db").then(m => m.getDb());
        if (!db) {
          return { success: false, error: "Database not available" };
        }

        const { graphicalPasswords } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        await db.update(graphicalPasswords)
          .set({
            passwordHash,
            salt,
            selectedImages: input.newSelectedImages,
            failedAttempts: 0,
            lockedUntil: null,
          })
          .where(eq(graphicalPasswords.username, input.username));

        return { success: true };
      }),
  }),

  // Usability Testing & Analytics
  testing: router({
    // Get usability test statistics
    getStats: publicProcedure
      .query(async () => {
        return await getUsabilityTestStats();
      }),

    // Record a usability test result
    recordTest: publicProcedure
      .input(z.object({
        username: z.string(),
        testType: z.enum(["registration", "login", "memorability"]),
        success: z.boolean(),
        completionTime: z.number(),
        attempts: z.number().default(1),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await recordUsabilityTest(input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
