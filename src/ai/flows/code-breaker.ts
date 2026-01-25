import { defineFlow } from '@genkit-ai/flow';

/**
 * Code Breaker Flow
 * Generates code breaking and cipher challenges
 */
export const codeBreakerFlow = defineFlow(
  {
    name: 'codeBreaker',
    inputSchema: {
      type: 'object',
      properties: {
        cipherType: { type: 'string', enum: ['caesar', 'substitution', 'morse', 'binary'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['cipherType', 'difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        encryptedMessage: { type: 'string' },
        solution: { type: 'string' },
        hint: { type: 'string' },
      },
    },
  },
  async (input) => {
    return {
      encryptedMessage: 'Khoor Zruog',
      solution: 'Hello World',
      hint: 'Caesar cipher with shift of 3',
    };
  }
);
