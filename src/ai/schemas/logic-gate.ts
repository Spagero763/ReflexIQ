import { defineSchema } from '@genkit-ai/flow';

export const logicGateInputSchema = defineSchema('LogicGateInput', {
  type: 'object',
  properties: {
    gateType: { type: 'string' },
    difficulty: { type: 'string' },
  },
});

export const logicGateOutputSchema = defineSchema('LogicGateOutput', {
  type: 'object',
  properties: {
    problem: { type: 'string' },
    inputValues: { type: 'array' },
    answer: { type: 'boolean' },
    explanation: { type: 'string' },
  },
});
