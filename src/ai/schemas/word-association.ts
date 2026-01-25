import { defineSchema } from '@genkit-ai/flow';

export const wordAssociationInputSchema = defineSchema('WordAssociationInput', {
  type: 'object',
  properties: {
    category: { type: 'string' },
    difficulty: { type: 'string' },
  },
});

export const wordAssociationOutputSchema = defineSchema('WordAssociationOutput', {
  type: 'object',
  properties: {
    words: { type: 'array' },
    associations: { type: 'object' },
  },
});
