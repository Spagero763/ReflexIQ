import { defineSchema } from '@genkit-ai/flow';

export const colorMatchInputSchema = defineSchema('ColorMatchInput', {
  type: 'object',
  properties: {
    difficulty: { type: 'string' },
    colorModel: { type: 'string' },
  },
});

export const colorMatchOutputSchema = defineSchema('ColorMatchOutput', {
  type: 'object',
  properties: {
    targetColor: { type: 'string' },
    options: { type: 'array', items: { type: 'string' } },
    correctIndex: { type: 'number' },
  },
});
