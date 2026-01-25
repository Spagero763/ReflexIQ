import { defineSchema } from '@genkit-ai/flow';

export const visualMemoryInputSchema = defineSchema('VisualMemoryInput', {
  type: 'object',
  properties: {
    gridSize: { type: 'number' },
    difficulty: { type: 'string' },
  },
});

export const visualMemoryOutputSchema = defineSchema('VisualMemoryOutput', {
  type: 'object',
  properties: {
    cards: { type: 'array' },
    totalPairs: { type: 'number' },
  },
});
