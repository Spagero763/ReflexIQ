
'use server';
/**
 * @fileOverview AI flow for generating a word for the Word Scramble game.
 *
 * - generateScrambledWord - Generates a new word and its scrambled version.
 */

import { ai } from '@/ai/genkit';
import { GenerateScrambledWordInputSchema, GenerateScrambledWordOutputSchema, type GenerateScrambledWordInput, type GenerateScrambledWordOutput } from '@/ai/schemas/scramble-word';


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
