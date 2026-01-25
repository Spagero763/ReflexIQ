import { defineFlow } from '@genkit-ai/flow';

/**
 * Anagram Solver Flow
 * Generates anagrams for players to solve
 */
export const anagramSolverFlow = defineFlow(
  {
    name: 'anagramSolver',
    inputSchema: {
      type: 'object',
      properties: {
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        category: { type: 'string', enum: ['animals', 'countries', 'fruits', 'random'] },
      },
      required: ['difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        scrambled: { type: 'string' },
        solution: { type: 'string' },
        hints: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  async (input) => {
    return {
      scrambled: 'TERAP',
      solution: 'PRATE',
      hints: ['A tropical fruit', 'Starts with P'],
    };
  }
);
