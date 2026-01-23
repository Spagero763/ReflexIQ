export class ScoreMultiplier {
  private baseMultiplier: number = 1;
  private bonusMultiplier: number = 1;

  setBaseMultiplier(multiplier: number): void {
    this.baseMultiplier = Math.max(0, multiplier);
  }

  addBonusMultiplier(bonus: number): void {
    this.bonusMultiplier += bonus;
  }

  getTotal(): number {
    return this.baseMultiplier * this.bonusMultiplier;
  }

  applyToScore(score: number): number {
    return Math.round(score * this.getTotal());
  }
}
