import { defineFlow } from '@genkit-ai/flow';

/**
 * Color Match Flow
 * Generates color matching challenges
 */
export const colorMatchFlow = defineFlow(
  {
    name: 'colorMatch',
    inputSchema: {
      type: 'object',
      properties: {
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard', 'expert'] },
        colorModel: { type: 'string', enum: ['rgb', 'hex', 'hsl', 'hsv'] },
        timeLimit: { type: 'number' },
      },
      required: ['difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        targetColor: { type: 'string' },
        options: { type: 'array', items: { type: 'string' } },
        correctIndex: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      targetColor: '#FF5733',
      options: ['#FF5733', '#33FF57', '#3357FF', '#FF33F5'],
      correctIndex: 0,
    };
  }
);
