import { defineSchema } from '@genkit-ai/flow';

export const patternRecognitionInputSchema = defineSchema('PatternRecognitionInput', {
  type: 'object',
  properties: {
    patternType: { type: 'string', enum: ['visual', 'numeric', 'temporal'] },
    difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
  },
});

export const patternRecognitionOutputSchema = defineSchema('PatternRecognitionOutput', {
  type: 'object',
  properties: {
    pattern: { type: 'array' },
    answer: { type: 'string' },
    explanation: { type: 'string' },
  },
});
