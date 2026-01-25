import { defineSchema } from '@genkit-ai/flow';

export const mathChallengeInputSchema = defineSchema('MathChallengeInput', {
  type: 'object',
  properties: {
    topic: { type: 'string', enum: ['arithmetic', 'algebra', 'geometry', 'calculus'] },
    difficulty: { type: 'string' },
  },
});

export const mathChallengeOutputSchema = defineSchema('MathChallengeOutput', {
  type: 'object',
  properties: {
    problem: { type: 'string' },
    answer: { type: 'number' },
    steps: { type: 'array', items: { type: 'string' } },
  },
});
