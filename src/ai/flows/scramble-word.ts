
'use server';
/**
 * @fileOverview AI flow for generating a word for the Word Scramble game.
 *
 * - generateScrambledWord - Generates a new word and its scrambled version.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateScrambledWordInputSchema = z.object({
  category: z.string().describe("The category for the word, e.g., 'Animals', 'Technology', 'Food'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty, which can influence word length."),
});
export type GenerateScrambledWordInput = z.infer<typeof GenerateScrambledWordInputSchema>;

export const GenerateScrambledWordOutputSchema = z.object({
  originalWord: z.string().describe("The original, unscrambled word."),
  scrambledWord: z.string().describe("The scrambled version of the word."),
});
export type GenerateScrambledWordOutput = z.infer<typeof GenerateScrambledWordOutputSchema>;

const generateScrambledWordPrompt = ai.definePrompt({
    name: 'generateScrambledWordPrompt',
    input: { schema: GenerateScrambledWordInputSchema },
    output: { schema: GenerateScrambledWordOutputSchema },
    prompt: `You are a word game master.

    Generate a single English word for a Word Scramble game based on the provided category and difficulty.
    - Easy: 4-6 letters.
    - Medium: 6-8 letters.
    - Hard: 8-10 letters.
    The word should not contain spaces or special characters.

    Then, scramble the letters of that word. The scrambled version must not be the same as the original word.

    Return both the original word and the scrambled word.

    Category: {{{category}}}
    Difficulty: {{{difficulty}}}
    `,
});

const generateScrambledWordFlow = ai.defineFlow(
    {
        name: 'generateScrambledWordFlow',
        inputSchema: GenerateScrambledWordInputSchema,
        outputSchema: GenerateScrambledWordOutputSchema,
    },
    async (input) => {
        const { output } = await generateScrambledWordPrompt(input);
        return output!;
    }
);

export async function generateScrambledWord(input: GenerateScrambledWordInput): Promise<GenerateScrambledWordOutput> {
    return generateScrambledWordFlow(input);
}
