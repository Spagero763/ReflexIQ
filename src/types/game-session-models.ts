export interface GameSession {
  id: string;
  playerId: string;
  gameType: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  score: number;
  duration: number;
}

export interface GameResult {
  sessionId: string;
  playerId: string;
  gameType: string;
  score: number;
  finalScore: number;
  duration: number;
  completedAt: Date;
  perfect: boolean;
}
