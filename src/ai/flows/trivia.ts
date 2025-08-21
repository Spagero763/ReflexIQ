
'use server';
/**
 * @fileOverview AI flow for generating trivia questions.
 *
 * - generateTriviaQuestion - Generates a new trivia question.
 */

import { ai } from '@/ai/genkit';
import { GenerateTriviaInputSchema, GenerateTriviaOutputSchema, type GenerateTriviaInput, type GenerateTriviaOutput } from '@/ai/schemas/trivia';


const generateTriviaPrompt = ai.definePrompt({
    name: 'generateTriviaPrompt',
    input: { schema: GenerateTriviaInputSchema },
    output: { schema: GenerateTriviaOutputSchema },
    prompt: `You are a master trivia creator.

    Generate a single trivia question based on the provided category and difficulty.
    Provide 4 multiple-choice options, with one being the correct answer.
    Return the question, the options, the correct answer, and the category.

    Difficulty: {{{difficulty}}}
    Category: {{{category}}}
    `,
});

const generateTriviaFlow = ai.defineFlow(
    {
        name: 'generateTriviaFlow',
        inputSchema: GenerateTriviaInputSchema,
        outputSchema: GenerateTriviaOutputSchema,
    },
    async (input) => {
        const { output } = await generateTriviaPrompt(input);
        return output!;
    }
);

export async function generateTriviaQuestion(input: GenerateTriviaInput): Promise<GenerateTriviaOutput> {
    return generateTriviaFlow(input);
}
