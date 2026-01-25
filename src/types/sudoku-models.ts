// Sudoku-related type definitions

export interface SudokuCell {
  value: number | null;
  isGiven: boolean;
  notes: Set<number>;
}

export interface SudokuBoard {
  cells: SudokuCell[][];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  createdAt: Date;
  solvedAt?: Date;
  moveHistory: SudokuMove[];
}

export interface SudokuMove {
  row: number;
  col: number;
  value: number;
  timestamp: number;
}

export interface SudokuPuzzle {
  id: string;
  initialState: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  timeToSolve?: number;
  hints: string[];
}

export interface SudokuStats {
  totalPuzzlesSolved: number;
  averageTime: number;
  personalBest: number;
  streakCount: number;
  accuracyRate: number;
}
