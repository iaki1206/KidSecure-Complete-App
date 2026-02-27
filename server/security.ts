import { createHash, randomBytes, timingSafeEqual, pbkdf2Sync } from 'crypto';

/**
 * Security utilities for graphical password authentication
 * Implements bcrypt-style hashing with salt and constant-time comparison
 */

const SALT_LENGTH = 32; // 32 bytes = 256 bits
const HASH_ITERATIONS = 100000; // PBKDF2 iterations
const HASH_LENGTH = 64; // Output hash length in bytes

/**
 * Generate a cryptographically secure random salt
 */
export function generateSalt(): string {
  return randomBytes(SALT_LENGTH).toString('hex');
}

/**
 * Hash the selected image IDs with a salt using PBKDF2
 * @param imageIds Array of selected image IDs (e.g., ["farm-cow", "wild-lion", ...])
 * @param salt Hexadecimal salt string
 * @returns Hexadecimal hash string
 */
export function hashPassword(imageIds: string[], salt: string): string {
  // Concatenate image IDs with a delimiter
  const password = imageIds.join('::');

  // Use PBKDF2 for key derivation (similar to bcrypt but built-in to Node.js)
  const hash = pbkdf2Sync(
    password,
    salt,
    HASH_ITERATIONS,
    HASH_LENGTH,
    'sha512'
  );

  return hash.toString('hex');
}

/**
 * Verify a password attempt against the stored hash using constant-time comparison
 * @param attemptedImageIds Array of attempted image IDs
 * @param storedHash The stored password hash
 * @param salt The salt used for the stored hash
 * @returns true if passwords match, false otherwise
 */
export function verifyPassword(
  attemptedImageIds: string[],
  storedHash: string,
  salt: string
): boolean {
  const attemptedHash = hashPassword(attemptedImageIds, salt);

  // Convert hex strings to buffers for constant-time comparison
  const attemptedBuffer = Buffer.from(attemptedHash, 'hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');

  // Ensure buffers are same length (should always be true if hashing is correct)
  if (attemptedBuffer.length !== storedBuffer.length) {
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  return timingSafeEqual(attemptedBuffer, storedBuffer);
}

/**
 * Generate decoy rounds for shoulder-surfing resistance
 * Returns indices of which rounds should be decoys (not used for actual authentication)
 * @param totalRounds Total number of rounds (default 4)
 * @param numDecoys Number of decoy rounds (default 1)
 * @returns Array of decoy round indices (0-based)
 */
export function generateDecoyRounds(totalRounds: number = 4, numDecoys: number = 1): number[] {
  const decoys: number[] = [];
  const availableRounds = Array.from({ length: totalRounds }, (_, i) => i);

  for (let i = 0; i < numDecoys; i++) {
    const randomIndex = Math.floor(Math.random() * availableRounds.length);
    decoys.push(availableRounds[randomIndex]);
    availableRounds.splice(randomIndex, 1);
  }

  return decoys.sort((a, b) => a - b);
}

/**
 * Validate username format
 * Must be 3-20 characters, alphanumeric with optional underscores/hyphens
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters long" };
  }

  if (username.length > 20) {
    return { valid: false, error: "Username must be 20 characters or less" };
  }

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, underscores, and hyphens" };
  }

  return { valid: true };
}

/**
 * Validate selected images for password creation
 * Must have exactly 4 unique image IDs
 */
export function validateImageSelection(imageIds: string[]): { valid: boolean; error?: string } {
  if (!imageIds || imageIds.length !== 4) {
    return { valid: false, error: "Must select exactly 4 images" };
  }

  // Check for duplicates
  const uniqueIds = new Set(imageIds);
  if (uniqueIds.size !== 4) {
    return { valid: false, error: "All selected images must be different" };
  }

  // Validate image ID format (category-animal)
  const imageIdRegex = /^(farm|wild|sea|bird|insect)-[a-z-]+$/;
  for (const id of imageIds) {
    if (!imageIdRegex.test(id)) {
      return { valid: false, error: `Invalid image ID format: ${id}` };
    }
  }

  return { valid: true };
}
