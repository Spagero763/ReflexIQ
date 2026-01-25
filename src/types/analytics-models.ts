// Analytics and tracking models

export interface GameAnalytics {
  userId: string;
  gameId: string;
  sessionId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  score: number;
  difficulty: string;
  outcome: 'win' | 'loss' | 'quit';
  events: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  type: 'action' | 'error' | 'milestone' | 'ui_interaction';
  name: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface UserAnalytics {
  userId: string;
  totalSessions: number;
  totalPlaytime: number;
  averageSessionLength: number;
  totalScore: number;
  winRate: number;
  favoriteGames: string[];
  engagementScore: number;
}

export interface GameStatistics {
  gameId: string;
  totalPlays: number;
  totalPlayers: number;
  averageScore: number;
  averageDuration: number;
  winRate: number;
  mostPopularDifficulty: string;
  dailyActiveUsers: number;
}

export interface AggregatedMetrics {
  date: Date;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalSessions: number;
  totalPlaytime: number;
  averageSessionLength: number;
  gameMetrics: Map<string, GameStatistics>;
}

export interface UserBehavior {
  userId: string;
  lastGamePlayed?: Date;
  lastGameType?: string;
  preferredDifficulty: string;
  averageAccuracy: number;
  improvementRate: number;
  engagementLevel: 'high' | 'medium' | 'low';
}
