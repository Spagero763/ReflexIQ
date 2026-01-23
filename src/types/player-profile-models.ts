export interface PlayerLevel {
  level: number;
  experience: number;
  nextLevelXp: number;
  progressPercentage: number;
}

export interface PlayerRank {
  rank: number;
  rating: number;
  totalMatches: number;
}
