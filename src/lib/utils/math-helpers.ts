export function calculateScore(
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  difficulty: number
): number {
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const baseScore = accuracy * 10;
  const timeBonus = Math.max(0, (100 - timeSpent) * 0.5);
  const difficultyMultiplier = 1 + difficulty * 0.2;
  return Math.round((baseScore + timeBonus) * difficultyMultiplier);
}

export function calculateLevel(experience: number): number {
  const levelThreshold = 100;
  return Math.floor(experience / levelThreshold) + 1;
}

export function calculateWinRate(wins: number, totalGames: number): number {
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100);
}
