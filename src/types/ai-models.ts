export interface AIGeneratedContent {
  type: 'question' | 'hint' | 'explanation';
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
}

export interface AdaptiveDifficultyData {
  playerLevel: number;
  successRate: number;
  averageTime: number;
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
}
