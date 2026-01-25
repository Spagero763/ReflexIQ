import { defineFlow } from '@genkit-ai/flow';

/**
 * Reflex Test Flow
 * Generates quick reaction time challenges
 */
export const reflexTestFlow = defineFlow(
  {
    name: 'reflexTest',
    inputSchema: {
      type: 'object',
      properties: {
        testType: { type: 'string', enum: ['visual', 'audio', 'combined'] },
        duration: { type: 'number', description: 'Test duration in seconds' },
      },
      required: ['testType'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        stimulus: { type: 'string' },
        expectedResponse: { type: 'string' },
        timeoutMs: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      stimulus: 'Red Circle Appeared',
      expectedResponse: 'click',
      timeoutMs: 1000,
    };
  }
);
