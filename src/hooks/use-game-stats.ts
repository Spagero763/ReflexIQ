import { useState, useCallback } from 'react';

/**
 * Custom hook for managing game statistics
 */
export const useGameStats = () => {
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    totalScore: 0,
    gamesWon: 0,
    gamesLost: 0,
    averageScore: 0,
    bestScore: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  const recordGameResult = useCallback(
    (score: number, won: boolean) => {
      setStats((prev) => {
        const newTotal = prev.totalGamesPlayed + 1;
        const newScore = prev.totalScore + score;
        return {
          totalGamesPlayed: newTotal,
          totalScore: newScore,
          gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
          gamesLost: !won ? prev.gamesLost + 1 : prev.gamesLost,
          averageScore: newScore / newTotal,
          bestScore: Math.max(prev.bestScore, score),
          longestStreak: prev.longestStreak,
          currentStreak: won ? prev.currentStreak + 1 : 0,
        };
      });
    },
    []
  );

  const resetStats = useCallback(() => {
    setStats({
      totalGamesPlayed: 0,
      totalScore: 0,
      gamesWon: 0,
      gamesLost: 0,
      averageScore: 0,
      bestScore: 0,
      longestStreak: 0,
      currentStreak: 0,
    });
  }, []);

  return { stats, recordGameResult, resetStats };
};
