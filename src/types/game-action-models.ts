export type GameAction = 
  | { type: 'START_GAME'; payload: { gameId: string } }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME'; payload: { score: number } }
  | { type: 'SUBMIT_ANSWER'; payload: { answer: any } }
  | { type: 'USE_HINT'; payload: { hintId: string } }
  | { type: 'SKIP_QUESTION' }
  | { type: 'UPDATE_SCORE'; payload: { points: number } };

export interface GameDispatch {
  (action: GameAction): void;
}
