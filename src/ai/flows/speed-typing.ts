import { defineFlow } from '@genkit-ai/flow';

/**
 * Speed Typing Flow
 * Generates typing challenges with various texts
 */
export const speedTypingFlow = defineFlow(
  {
    name: 'speedTyping',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: ['quotes', 'code', 'prose', 'random'] },
        duration: { type: 'number', description: 'Duration in seconds' },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['category'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        wordCount: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      text: 'The quick brown fox jumps over the lazy dog',
      wordCount: 9,
    };
  }
);
