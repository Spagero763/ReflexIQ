import { defineFlow } from '@genkit-ai/flow';

/**
 * Pattern Recognition Flow
 * Generates pattern recognition challenges
 */
export const patternRecognitionFlow = defineFlow(
  {
    name: 'patternRecognition',
    inputSchema: {
      type: 'object',
      properties: {
        patternType: { type: 'string', enum: ['visual', 'numeric', 'temporal'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['patternType'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'array' },
        answer: { type: 'string' },
      },
    },
  },
  async (input) => {
    return {
      pattern: ['1', '1', '2', '3', '5', '8', '13'],
      answer: '21',
    };
  }
);
