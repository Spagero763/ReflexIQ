import { defineFlow } from '@genkit-ai/flow';

/**
 * Logic Gate Flow
 * Generates logic puzzle challenges
 */
export const logicGateFlow = defineFlow(
  {
    name: 'logicGate',
    inputSchema: {
      type: 'object',
      properties: {
        gateType: { type: 'string', enum: ['AND', 'OR', 'XOR', 'NOT', 'NAND', 'NOR'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      },
      required: ['difficulty'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        problem: { type: 'string' },
        inputValues: { type: 'array', items: { type: 'boolean' } },
        answer: { type: 'boolean' },
        explanation: { type: 'string' },
      },
    },
  },
  async (input) => {
    return {
      problem: 'What is the output of AND gate with inputs A=1, B=0?',
      inputValues: [true, false],
      answer: false,
      explanation: 'AND gate outputs true only if both inputs are true',
    };
  }
);
