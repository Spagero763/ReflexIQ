import { defineSchema } from '@genkit-ai/flow';

export const speedTypingInputSchema = defineSchema('SpeedTypingInput', {
  type: 'object',
  properties: {
    category: { type: 'string', enum: ['quotes', 'code', 'prose', 'random'] },
    duration: { type: 'number' },
    difficulty: { type: 'string' },
  },
});

export const speedTypingOutputSchema = defineSchema('SpeedTypingOutput', {
  type: 'object',
  properties: {
    text: { type: 'string' },
    wordCount: { type: 'number' },
  },
});
