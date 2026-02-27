/**
 * Child-friendly security questions for password recovery
 * These questions are designed to be memorable and easy for children to answer
 */

export const SECURITY_QUESTIONS = [
  "What is your favorite color?",
  "What is your favorite animal?",
  "What is your favorite food?",
  "What is your favorite toy?",
  "What is your favorite game?",
  "What is the name of your best friend?",
  "What is your favorite cartoon character?",
  "What is your favorite sport?",
  "What is your favorite book?",
  "What is your favorite movie?",
  "What month were you born?",
  "What is your favorite ice cream flavor?",
  "What is your pet's name?",
  "What is your favorite superhero?",
  "What is your favorite season (summer, winter, spring, fall)?",
] as const;

export type SecurityQuestion = typeof SECURITY_QUESTIONS[number];
