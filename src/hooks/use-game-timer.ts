import { useState, useCallback } from 'react';

/**
 * Custom hook for managing game timer
 */
export const useGameTimer = (duration: number) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) {
        setIsRunning(false);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  return { timeLeft, isRunning, start, pause, reset, tick };
};
