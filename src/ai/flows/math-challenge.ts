import { defineFlow } from '@genkit-ai/flow';

/**
 * Math Challenge Flow
 * Generates mathematical problems and puzzles
 */
export const mathChallengeFlow = defineFlow(
  {
    name: 'mathChallenge',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', enum: ['arithmetic', 'algebra', 'geometry', 'calculus'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        timeLimit: { type: 'number' },
      },
      required: ['topic'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        problem: { type: 'string' },
        answer: { type: 'number' },
        steps: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  async (input) => {
    return {
      problem: 'Solve: 2x + 5 = 13',
      answer: 4,
      steps: ['2x + 5 = 13', '2x = 8', 'x = 4'],
    };
  }
);
