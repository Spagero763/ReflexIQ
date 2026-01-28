import { useEffect, useState, useCallback } from 'react';

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
    
    const timer = setTimeout(() => {
      setStartTime(new Date());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [isGameActive]);

  const addScore = useCallback((points: number) => {
    if (typeof points !== 'number' || points < 0) return;
    
    setScore((prev) => {
      const newScore = prev + points;
      // Level up every 1000 points
      if (newScore > 0 && newScore % 1000 === 0 && newScore > prev) {
        setLevel((prevLevel) => prevLevel + 1);
      }
      return newScore;
    });
  }, []);

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
