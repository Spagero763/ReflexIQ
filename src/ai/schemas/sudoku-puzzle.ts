import { defineSchema } from '@genkit-ai/flow';

export const sudokuInputSchema = defineSchema('SudokuInput', {
  type: 'object',
  properties: {
    difficulty: { type: 'string', enum: ['easy', 'medium', 'hard', 'expert'] },
    boardSize: { type: 'number' },
  },
});

export const sudokuOutputSchema = defineSchema('SudokuOutput', {
  type: 'object',
  properties: {
    puzzle: { type: 'string' },
    solution: { type: 'string' },
    difficulty: { type: 'string' },
  },
});
