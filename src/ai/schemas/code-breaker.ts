import { defineSchema } from '@genkit-ai/flow';

export const codeBreakerInputSchema = defineSchema('CodeBreakerInput', {
  type: 'object',
  properties: {
    cipherType: { type: 'string' },
    difficulty: { type: 'string' },
  },
});

export const codeBreakerOutputSchema = defineSchema('CodeBreakerOutput', {
  type: 'object',
  properties: {
    encryptedMessage: { type: 'string' },
    solution: { type: 'string' },
    hint: { type: 'string' },
  },
});
