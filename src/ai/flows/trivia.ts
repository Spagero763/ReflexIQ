
'use server';
/**
 * @fileOverview AI flow for generating trivia questions.
 *
 * - generateTriviaQuestion - Generates a new trivia question.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateTriviaInputSchema = z.object({
  category: z.string().describe("The category of the trivia question, e.g., 'Science', 'History', 'Movies'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty of the question."),
});
export type GenerateTriviaInput = z.infer<typeof GenerateTriviaInputSchema>;

export const GenerateTriviaOutputSchema = z.object({
  question: z.string().describe("The trivia question."),
  options: z.array(z.string()).describe("A list of 4 possible answers."),
  answer: z.string().describe("The correct answer from the options."),
  category: z.string().describe("The category of the question generated."),
});
export type GenerateTriviaOutput = z.infer<typeof GenerateTriviaOutputSchema>;

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
