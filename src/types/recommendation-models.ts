// Recommendation engine models

export interface RecommendationModel {
  gameId: string;
  score: number;
  reason: string;
}

export interface UserPreferences {
  favoriteGames: string[];
  preferredDifficulty: 'easy' | 'medium' | 'hard';
  playStyle: 'casual' | 'competitive' | 'learning';
  topCategories: string[];
}

export interface GameRecommendation {
  gameId: string;
  name: string;
  matchScore: number;
  reasons: string[];
  difficulty: string;
  estimatedPlaytime: number;
}

export interface RecommendationResult {
  recommendations: GameRecommendation[];
  personalizedTitle: string;
  timestamp: Date;
}
