import { useState, useCallback } from 'react';

/**
 * Custom hook for managing game combo counter
 */
export const useCombo = () => {
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const increment = useCallback(() => {
    setCombo((prev) => {
      const newCombo = prev + 1;
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
      return newCombo;
    });
  }, [maxCombo]);

  const reset = useCallback(() => {
    setCombo(0);
  }, []);

  const resetMax = useCallback(() => {
    setCombo(0);
    setMaxCombo(0);
  }, []);

  return { combo, maxCombo, increment, reset, resetMax };
};
