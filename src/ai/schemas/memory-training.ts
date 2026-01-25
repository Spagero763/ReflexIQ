import { defineSchema } from '@genkit-ai/flow';

export const memoryTrainingInputSchema = defineSchema('MemoryTrainingInput', {
  type: 'object',
  properties: {
    trainingMode: { type: 'string' },
    duration: { type: 'number' },
    difficulty: { type: 'string' },
  },
});

export const memoryTrainingOutputSchema = defineSchema('MemoryTrainingOutput', {
  type: 'object',
  properties: {
    stimulus: { type: 'array' },
    displayTime: { type: 'number' },
  },
});
