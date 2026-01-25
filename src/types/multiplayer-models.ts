// Multiplayer game models

export interface MultiplayerMatch {
  id: string;
  gameType: string;
  players: MultiplayerPlayer[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  winner?: string;
  leaderboard: MatchLeaderboard[];
}

export interface MultiplayerPlayer {
  userId: string;
  displayName: string;
  score: number;
  status: 'active' | 'disconnected' | 'left';
  joinedAt: Date;
  statistics: PlayerMatchStats;
}

export interface PlayerMatchStats {
  correctAnswers: number;
  totalAttempts: number;
  averageTime: number;
  accuracy: number;
}

export interface MatchLeaderboard {
  rank: number;
  userId: string;
  displayName: string;
  finalScore: number;
  accuracy: number;
}

export interface MultiplayerSession {
  id: string;
  currentRound: number;
  totalRounds: number;
  roundDuration: number;
  commonChallenge: GameChallenge;
  playerResponses: Map<string, PlayerResponse>;
}

export interface PlayerResponse {
  userId: string;
  answer: string;
  isCorrect: boolean;
  responseTime: number;
  timestamp: number;
}

export interface GameChallenge {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  timeLimit: number;
}
