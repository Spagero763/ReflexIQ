import { defineFlow } from '@genkit-ai/flow';

/**
 * Word Association Game Flow
 */
export const wordAssociationFlow = defineFlow(
  {
    name: 'wordAssociation',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: ['animals', 'objects', 'concepts', 'random'] },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        wordCount: { type: 'number', default: 10 },
      },
      required: ['category'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        words: { type: 'array', items: { type: 'string' } },
        expectedAssociations: { type: 'object' },
      },
    },
  },
  async (input) => {
    return {
      words: ['happy', 'sad', 'bright', 'dark'],
      expectedAssociations: {
        happy: ['smile', 'joy', 'laughter'],
        sad: ['tear', 'sorrow', 'grief'],
      },
    };
  }
);
