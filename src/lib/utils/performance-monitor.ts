export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  startMetric(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      this.metrics.get(name)!.push(duration);
    };
  }

  getAverageDuration(name: string): number {
    const durations = this.metrics.get(name) || [];
    if (durations.length === 0) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  clear(): void {
    this.metrics.clear();
  }
}
