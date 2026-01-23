export interface MatchParticipant {
  playerId: string;
  playerName: string;
  score: number;
  status: 'active' | 'completed' | 'abandoned';
}

export interface Match {
  id: string;
  gameType: string;
  participants: MatchParticipant[];
  status: 'waiting' | 'ongoing' | 'completed';
  startTime: Date;
  endTime?: Date;
  winner?: string;
}
