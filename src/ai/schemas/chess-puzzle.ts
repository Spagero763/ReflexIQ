import { defineSchema } from '@genkit-ai/flow';

export const chessPuzzleInputSchema = defineSchema('ChessPuzzleInput', {
  type: 'object',
  properties: {
    difficulty: {
      type: 'string',
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    timeLimit: {
      type: 'number',
    },
    gameMode: {
      type: 'string',
      enum: ['puzzle', 'endgame', 'opening'],
    },
  },
});

export const chessPuzzleOutputSchema = defineSchema('ChessPuzzleOutput', {
  type: 'object',
  properties: {
    boardState: { type: 'string' },
    solution: { type: 'string' },
    alternativeSolutions: { type: 'array', items: { type: 'string' } },
    hints: { type: 'array', items: { type: 'string' } },
    explanation: { type: 'string' },
  },
});
