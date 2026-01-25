import { useEffect, useState } from 'react';

/**
 * Custom hook for tracking game state
 */
export const useGameState = (initialScore: number = 0) => {
  const [score, setScore] = useState(initialScore);
  const [level, setLevel] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!isGameActive) return;
    setStartTime(new Date());
  }, [isGameActive]);

  const addScore = (points: number) => {
    setScore((prev) => prev + points);
    if (score > 0 && (score + points) % 1000 === 0) {
      setLevel((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setScore(initialScore);
    setLevel(1);
    setIsGameActive(false);
    setStartTime(null);
  };

  return {
    score,
    level,
    isGameActive,
    startTime,
    addScore,
    setIsGameActive,
    resetGame,
  };
};
