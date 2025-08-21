
'use server';
/**
 * @fileOverview AI flow for generating a word for the Hangman game.
 *
 * - generateHangmanWord - Generates a new word for Hangman.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateHangmanWordInputSchema = z.object({
  category: z.string().describe("The category for the word, e.g., 'Animals', 'Programming', 'Food'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty, which can influence word length and obscurity."),
});
export type GenerateHangmanWordInput = z.infer<typeof GenerateHangmanWordInputSchema>;

export const GenerateHangmanWordOutputSchema = z.object({
  word: z.string().describe("A single word for the Hangman game, returned in uppercase."),
});
export type GenerateHangmanWordOutput = z.infer<typeof GenerateHangmanWordOutputSchema>;

const generateHangmanWordPrompt = ai.definePrompt({
    name: 'generateHangmanWordPrompt',
    input: { schema: GenerateHangmanWordInputSchema },
    output: { schema: GenerateHangmanWordOutputSchema },
    prompt: `You are a word game master.

    Generate a single English word for a game of Hangman based on the provided category and difficulty.
    - Easy: 4-6 letters.
    - Medium: 6-8 letters.
    - Hard: 8-12 letters.
    The word should not contain spaces or special characters.
    Return the word in ALL UPPERCASE.

    Category: {{{category}}}
    Difficulty: {{{difficulty}}}
    `,
});

const generateHangmanWordFlow = ai.defineFlow(
    {
        name: 'generateHangmanWordFlow',
        inputSchema: GenerateHangmanWordInputSchema,
        outputSchema: GenerateHangmanWordOutputSchema,
    },
    async (input) => {
        const { output } = await generateHangmanWordPrompt(input);
        return output!;
    }
);

export async function generateHangmanWord(input: GenerateHangmanWordInput): Promise<GenerateHangmanWordOutput> {
    return generateHangmanWordFlow(input);
}
