import { defineSchema } from '@genkit-ai/flow';

export const sequenceBuilderInputSchema = defineSchema('SequenceBuilderInput', {
  type: 'object',
  properties: {
    sequenceType: { type: 'string' },
    difficulty: { type: 'string' },
    length: { type: 'number' },
  },
});

export const sequenceBuilderOutputSchema = defineSchema('SequenceBuilderOutput', {
  type: 'object',
  properties: {
    sequence: { type: 'array' },
    nextNumbers: { type: 'array' },
    hint: { type: 'string' },
  },
});
