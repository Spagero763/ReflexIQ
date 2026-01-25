// Chess-related type definitions

export interface ChessPosition {
  file: number;
  rank: number;
}

export interface ChessPiece {
  type: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  color: 'white' | 'black';
  position: ChessPosition;
}

export interface ChessMove {
  from: ChessPosition;
  to: ChessPosition;
  promotion?: 'queen' | 'rook' | 'bishop' | 'knight';
  isCheck: boolean;
  isCheckmate: boolean;
}

export interface ChessPuzzle {
  id: string;
  fen: string;
  solution: ChessMove[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  theme: string[];
  rating: number;
}

export interface ChessGameState {
  board: ChessPiece[][];
  moveHistory: ChessMove[];
  currentTurn: 'white' | 'black';
  isCheckmate: boolean;
  isStalemate: boolean;
  isCheck: boolean;
}
