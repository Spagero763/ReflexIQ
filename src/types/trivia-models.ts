export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface TriviaSet {
  id: string;
  title: string;
  questions: TriviaQuestion[];
  timePerQuestion: number;
}
