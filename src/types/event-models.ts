export interface GameEvent {
  type: 'start' | 'pause' | 'resume' | 'complete' | 'abandon';
  timestamp: Date;
  playerId: string;
  gameId: string;
  data: Record<string, any>;
}

export interface AnalyticsEvent {
  eventName: string;
  timestamp: Date;
  userId: string;
  properties: Record<string, any>;
}
