import { defineSchema } from '@genkit-ai/flow';

export const numberSequenceInputSchema = defineSchema('NumberSequenceInput', {
  type: 'object',
  properties: {
    sequenceType: { type: 'string' },
    difficulty: { type: 'string' },
  },
});

export const numberSequenceOutputSchema = defineSchema('NumberSequenceOutput', {
  type: 'object',
  properties: {
    sequence: { type: 'array' },
    answer: { type: 'number' },
  },
});
