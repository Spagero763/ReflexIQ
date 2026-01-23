export class GameTimer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private isPaused: boolean = false;

  start(): void {
    this.startTime = Date.now();
  }

  pause(): void {
    this.pausedTime = Date.now();
    this.isPaused = true;
  }

  resume(): void {
    const pauseDuration = Date.now() - this.pausedTime;
    this.startTime += pauseDuration;
    this.isPaused = false;
  }

  getElapsed(): number {
    if (this.isPaused) return this.pausedTime - this.startTime;
    return Date.now() - this.startTime;
  }
}
