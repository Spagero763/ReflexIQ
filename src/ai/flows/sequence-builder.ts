import { defineFlow } from '@genkit-ai/flow';

/**
 * Sequence Builder Flow
 * Generates number and pattern sequences for players to complete
 */
export const sequenceBuilderFlow = defineFlow(
  {
    name: 'sequenceBuilder',
    inputSchema: {
      type: 'object',
      properties: {
        sequenceType: { type: 'string', enum: ['fibonacci', 'arithmetic', 'geometric', 'random'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        length: { type: 'number', minimum: 5, maximum: 20 },
      },
      required: ['sequenceType', 'difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        sequence: { type: 'array', items: { type: 'number' } },
        nextNumbers: { type: 'array', items: { type: 'number' } },
        hint: { type: 'string' },
      },
    },
  },
  async (input) => {
    return {
      sequence: [2, 4, 6, 8, 10],
      nextNumbers: [12, 14],
      hint: 'Each number increases by 2',
    };
  }
);
