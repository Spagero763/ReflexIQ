import { defineFlow } from '@genkit-ai/flow';

/**
 * Visual Memory Game Flow
 */
export const visualMemoryFlow = defineFlow(
  {
    name: 'visualMemory',
    inputSchema: {
      type: 'object',
      properties: {
        gridSize: { type: 'number', enum: [2, 3, 4, 5] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['gridSize'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        cards: { type: 'array' },
        totalPairs: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      cards: Array.from({ length: input.gridSize * input.gridSize }).map((_, i) => ({
        id: i,
        matched: false,
      })),
      totalPairs: (input.gridSize * input.gridSize) / 2,
    };
  }
);
