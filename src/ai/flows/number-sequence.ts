import { defineFlow } from '@genkit-ai/flow';

/**
 * Number Sequence Game Flow
 */
export const numberSequenceFlow = defineFlow(
  {
    name: 'numberSequence',
    inputSchema: {
      type: 'object',
      properties: {
        sequenceType: { type: 'string', enum: ['linear', 'fibonacci', 'prime', 'square'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['sequenceType'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        sequence: { type: 'array', items: { type: 'number' } },
        answer: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      sequence: [1, 4, 9, 16, 25],
      answer: 36,
    };
  }
);
