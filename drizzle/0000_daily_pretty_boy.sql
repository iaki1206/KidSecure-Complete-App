CREATE TABLE `graphical_passwords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`username` text NOT NULL,
	`passwordHash` text NOT NULL,
	`salt` text NOT NULL,
	`selectedImages` text NOT NULL,
	`failedAttempts` integer DEFAULT 0 NOT NULL,
	`lockedUntil` integer,
	`isActive` integer DEFAULT true NOT NULL,
	`securityQuestion1` text,
	`securityAnswer1Hash` text,
	`securityQuestion2` text,
	`securityAnswer2Hash` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `graphical_passwords_username_unique` ON `graphical_passwords` (`username`);--> statement-breakpoint
CREATE TABLE `login_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`success` integer NOT NULL,
	`attemptedAt` integer NOT NULL,
	`sessionInfo` text
);
--> statement-breakpoint
CREATE TABLE `usability_tests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`testType` text NOT NULL,
	`success` integer NOT NULL,
	`completionTime` integer NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`notes` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`openId` text NOT NULL,
	`name` text,
	`email` text,
	`loginMethod` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`lastSignedIn` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_openId_unique` ON `users` (`openId`);