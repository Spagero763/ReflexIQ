// Visual memory game specific models

export interface VisualMemoryCard {
  id: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string;
}

export interface VisualMemoryGame {
  id: string;
  cards: VisualMemoryCard[];
  moves: number;
  matches: number;
  startTime: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize: number;
}

export interface VisualMemoryResult {
  moves: number;
  time: number;
  accuracy: number;
  score: number;
  matches: number;
}
