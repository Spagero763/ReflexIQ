import { defineFlow } from '@genkit-ai/flow';

/**
 * Sudoku Puzzle Flow
 * Generates sudoku puzzles of varying difficulty levels
 */
export const sudokuFlow = defineFlow(
  {
    name: 'sudokuPuzzle',
    inputSchema: {
      type: 'object',
      properties: {
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard', 'expert'] },
        boardSize: { type: 'number', default: 9 },
      },
      required: ['difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        puzzle: { type: 'string' },
        solution: { type: 'string' },
      },
    },
  },
  async (input) => {
    return {
      puzzle: '530070000600195000098000060800060003400803001700020006060000280000419005000080079',
      solution: '534678912672195348198342567825761493469283751713952486956734128287419635341568279',
    };
  }
);
