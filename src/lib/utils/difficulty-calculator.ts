export function calculateAdaptiveDifficulty(
  successRate: number,
  currentDifficulty: number
): number {
  if (successRate > 80) return Math.min(currentDifficulty + 1, 10);
  if (successRate < 30) return Math.max(currentDifficulty - 1, 1);
  return currentDifficulty;
}
