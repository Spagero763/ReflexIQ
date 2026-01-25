// Number sequence game models

export interface NumberSequence {
  sequence: number[];
  pattern: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface NumberSequenceChallenge {
  id: string;
  sequence: NumberSequence;
  missingNumbers: number[];
  timeLimit: number;
  score: number;
}

export interface NumberSequenceResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  time: number;
}
