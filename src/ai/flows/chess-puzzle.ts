import { defineFlow } from '@genkit-ai/flow';

/**
 * Chess Puzzle Flow
 * Generates chess puzzle scenarios for players to solve
 */
export const chessPuzzleFlow = defineFlow(
  {
    name: 'chessPuzzle',
    inputSchema: {
      type: 'object',
      properties: {
        difficulty: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced'],
          description: 'Puzzle difficulty level',
        },
        timeLimit: {
          type: 'number',
          description: 'Time limit in seconds',
        },
      },
      required: ['difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        boardState: { type: 'string' },
        solution: { type: 'string' },
        hints: { type: 'array' },
      },
    },
  },
  async (input) => {
    return {
      boardState: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
      solution: 'Nxe5',
      hints: [
        'Look for undefended pieces',
        'Consider knight moves',
        'The e5 pawn is key',
      ],
    };
  }
);
