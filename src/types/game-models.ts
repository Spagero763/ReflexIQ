export interface GameDifficulty {
  level: 'easy' | 'medium' | 'hard' | 'expert';
  multiplier: number;
  timeLimit: number;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: GameDifficulty;
}

export interface GamePlayer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

export interface GameScore {
  points: number;
  combo: number;
  accuracy: number;
}
