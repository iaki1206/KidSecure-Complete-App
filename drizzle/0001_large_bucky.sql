CREATE TABLE `graphical_passwords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`username` varchar(100) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`salt` varchar(64) NOT NULL,
	`selectedImages` json NOT NULL,
	`failedAttempts` int NOT NULL DEFAULT 0,
	`lockedUntil` timestamp,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `graphical_passwords_id` PRIMARY KEY(`id`),
	CONSTRAINT `graphical_passwords_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `login_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`success` boolean NOT NULL,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	`sessionInfo` varchar(255),
	CONSTRAINT `login_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usability_tests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`testType` enum('registration','login','memorability') NOT NULL,
	`success` boolean NOT NULL,
	`completionTime` int NOT NULL,
	`attempts` int NOT NULL DEFAULT 1,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usability_tests_id` PRIMARY KEY(`id`)
);
