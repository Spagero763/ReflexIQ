/**
 * Analytics tracking utility for user engagement and game completion
 */

export interface GameEventPayload {
  gameId: string;
  gameName: string;
  difficulty: string;
  score: number;
  level: number;
  timeSpent: number; // in milliseconds
  completionStatus: 'completed' | 'abandoned' | 'failed';
  timestamp: number;
}

export interface UserEngagementEvent {
  eventType: 'game_started' | 'game_completed' | 'level_up' | 'achievement_unlocked' | 'session_ended';
  gameId?: string;
  data?: Record<string, any>;
  timestamp: number;
}

class AnalyticsTracker {
  private events: UserEngagementEvent[] = [];
  private gameEvents: GameEventPayload[] = [];
  private sessionStartTime: number = Date.now();
  private isLocalStorageAvailable: boolean = this.checkLocalStorageAvailable();

  private checkLocalStorageAvailable(): boolean {
    try {
      const test = '__reflexiq_storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Track a game completion event
   */
  trackGameCompletion(payload: GameEventPayload): void {
    try {
      this.gameEvents.push(payload);
      
      if (this.isLocalStorageAvailable) {
        const stored = JSON.parse(localStorage.getItem('reflexiq_game_analytics') || '[]');
        stored.push(payload);
        // Keep only last 100 events
        if (stored.length > 100) {
          stored.shift();
        }
        localStorage.setItem('reflexiq_game_analytics', JSON.stringify(stored));
      }

      console.debug('[Analytics] Game completion tracked:', payload);
    } catch (error) {
      console.error('[Analytics] Failed to track game completion:', error);
    }
  }

  /**
   * Track user engagement event
   */
  trackEvent(event: Omit<UserEngagementEvent, 'timestamp'>): void {
    try {
      const fullEvent: UserEngagementEvent = {
        ...event,
        timestamp: Date.now(),
      };

      this.events.push(fullEvent);

      if (this.isLocalStorageAvailable) {
        const stored = JSON.parse(localStorage.getItem('reflexiq_analytics') || '[]');
        stored.push(fullEvent);
        // Keep only last 100 events
        if (stored.length > 100) {
          stored.shift();
        }
        localStorage.setItem('reflexiq_analytics', JSON.stringify(stored));
      }

      console.debug('[Analytics] Event tracked:', fullEvent);
    } catch (error) {
      console.error('[Analytics] Failed to track event:', error);
    }
  }

  /**
   * Get session duration
   */
  getSessionDuration(): number {
    return Date.now() - this.sessionStartTime;
  }

  /**
   * Get analytics summary
   */
  getSummary() {
    return {
      totalEvents: this.events.length,
      totalGameEvents: this.gameEvents.length,
      sessionDuration: this.getSessionDuration(),
      recentEvents: this.events.slice(-10),
      recentGameEvents: this.gameEvents.slice(-10),
    };
  }

  /**
   * Clear all analytics data
   */
  clearAll(): void {
    this.events = [];
    this.gameEvents = [];
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem('reflexiq_analytics');
      localStorage.removeItem('reflexiq_game_analytics');
    }
  }
}

// Create singleton instance
export const analytics = new AnalyticsTracker();

/**
 * React hook for analytics tracking
 */
export const useAnalytics = () => {
  return {
    trackGameCompletion: (payload: GameEventPayload) => analytics.trackGameCompletion(payload),
    trackEvent: (event: Omit<UserEngagementEvent, 'timestamp'>) => analytics.trackEvent(event),
    getSessionDuration: () => analytics.getSessionDuration(),
    getSummary: () => analytics.getSummary(),
  };
};
