import { useState, useCallback } from 'react';

/**
 * Custom hook for managing game difficulty
 */
export const useDifficulty = (initialDifficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(initialDifficulty);

  const increaseDifficulty = useCallback(() => {
    setDifficulty((prev) => {
      if (prev === 'easy') return 'medium';
      if (prev === 'medium') return 'hard';
      return 'hard';
    });
  }, []);

  const decreaseDifficulty = useCallback(() => {
    setDifficulty((prev) => {
      if (prev === 'hard') return 'medium';
      if (prev === 'medium') return 'easy';
      return 'easy';
    });
  }, []);

  const setDiff = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
  }, []);

  return { difficulty, setDiff, increaseDifficulty, decreaseDifficulty };
};
