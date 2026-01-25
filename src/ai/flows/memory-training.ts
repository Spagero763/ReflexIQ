import { defineFlow } from '@genkit-ai/flow';

/**
 * Memory Training Flow
 */
export const memoryTrainingFlow = defineFlow(
  {
    name: 'memoryTraining',
    inputSchema: {
      type: 'object',
      properties: {
        trainingMode: { type: 'string', enum: ['digits', 'words', 'shapes', 'colors'] },
        duration: { type: 'number', description: 'Duration in seconds' },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['trainingMode'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        stimulus: { type: 'array' },
        displayTime: { type: 'number' },
      },
    },
  },
  async (input) => {
    return {
      stimulus: ['1', '4', '7', '9', '2'],
      displayTime: 3000,
    };
  }
);
