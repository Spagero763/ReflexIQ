// Word association game models

export interface WordAssociation {
  word: string;
  response: string;
  responseTime: number;
  isCorrect: boolean;
}

export interface WordAssociationGame {
  id: string;
  words: string[];
  associations: WordAssociation[];
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface WordAssociationStats {
  totalWords: number;
  correctAssociations: number;
  accuracy: number;
  averageTime: number;
  bestTime: number;
}
