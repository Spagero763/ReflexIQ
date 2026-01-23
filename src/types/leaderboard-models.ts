export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  score: number;
  wins: number;
  winRate: number;
}

export interface Leaderboard {
  id: string;
  title: string;
  entries: LeaderboardEntry[];
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
  lastUpdated: Date;
}
