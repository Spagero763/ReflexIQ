/**
 * Input validation utility functions for game components
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate game name input
 */
export const validateGameName = (name: string): ValidationResult => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Game name is required' };
  }

  if (name.trim().length === 0) {
    return { isValid: false, error: 'Game name cannot be empty' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'Game name must be 50 characters or less' };
  }

  return { isValid: true };
};

/**
 * Validate difficulty level
 */
export const validateDifficulty = (difficulty: string): ValidationResult => {
  const validDifficulties = ['easy', 'medium', 'hard', 'expert'];

  if (!difficulty || typeof difficulty !== 'string') {
    return { isValid: false, error: 'Difficulty is required' };
  }

  if (!validDifficulties.includes(difficulty.toLowerCase())) {
    return { isValid: false, error: `Difficulty must be one of: ${validDifficulties.join(', ')}` };
  }

  return { isValid: true };
};

/**
 * Validate score
 */
export const validateScore = (score: number): ValidationResult => {
  if (typeof score !== 'number' || isNaN(score)) {
    return { isValid: false, error: 'Score must be a valid number' };
  }

  if (score < 0) {
    return { isValid: false, error: 'Score cannot be negative' };
  }

  if (score > 999999) {
    return { isValid: false, error: 'Score cannot exceed 999,999' };
  }

  return { isValid: true };
};

/**
 * Validate game input string (for text-based games)
 */
export const validateGameInput = (input: string, minLength: number = 1, maxLength: number = 100): ValidationResult => {
  if (typeof input !== 'string') {
    return { isValid: false, error: 'Input must be a string' };
  }

  const trimmed = input.trim();

  if (trimmed.length < minLength) {
    return { isValid: false, error: `Input must be at least ${minLength} character(s)` };
  }

  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Input cannot exceed ${maxLength} characters` };
  }

  // Check for valid alphanumeric and basic punctuation
  if (!/^[a-zA-Z0-9\s\-',.!?]+$/.test(input)) {
    return { isValid: false, error: 'Input contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};
