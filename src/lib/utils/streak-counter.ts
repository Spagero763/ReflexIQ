export class StreakCounter {
  private currentStreak: number = 0;
  private maxStreak: number = 0;

  increment(): void {
    this.currentStreak++;
    this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
  }

  reset(): void {
    this.currentStreak = 0;
  }

  getCurrent(): number {
    return this.currentStreak;
  }

  getMax(): number {
    return this.maxStreak;
  }
}
