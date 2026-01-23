export interface GameStatistic {
  gameType: string;
  totalPlayed: number;
  wins: number;
  losses: number;
  bestScore: number;
  averageScore: number;
  playTime: number;
}

export interface PlayerStatistics {
  playerId: string;
  totalGamesPlayed: number;
  totalWins: number;
  winRate: number;
  totalPlayTime: number;
  gameStats: GameStatistic[];
}
