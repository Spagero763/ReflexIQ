import { defineSchema } from '@genkit-ai/flow';

export const anagramSolverInputSchema = defineSchema('AnagramSolverInput', {
  type: 'object',
  properties: {
    difficulty: { type: 'string' },
    category: { type: 'string' },
  },
});

export const anagramSolverOutputSchema = defineSchema('AnagramSolverOutput', {
  type: 'object',
  properties: {
    scrambled: { type: 'string' },
    solution: { type: 'string' },
    hints: { type: 'array' },
  },
});
