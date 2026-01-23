export interface PuzzleQuestion {
  id: string;
  type: 'logic' | 'word' | 'number' | 'pattern';
  question: string;
  answer: string | string[];
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  timeLimit: number;
}

export interface PuzzleSet {
  id: string;
  title: string;
  description: string;
  puzzles: PuzzleQuestion[];
  category: string;
}
