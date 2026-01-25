import { defineSchema } from '@genkit-ai/flow';

export const reflexTestInputSchema = defineSchema('ReflexTestInput', {
  type: 'object',
  properties: {
    testType: { type: 'string' },
    duration: { type: 'number' },
  },
});

export const reflexTestOutputSchema = defineSchema('ReflexTestOutput', {
  type: 'object',
  properties: {
    stimulus: { type: 'string' },
    expectedResponse: { type: 'string' },
    timeoutMs: { type: 'number' },
  },
});
