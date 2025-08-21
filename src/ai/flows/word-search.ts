
'use server';
/**
 * @fileOverview AI flow for generating Word Search puzzles.
 *
 * - generateWordSearch - Generates a new word search puzzle.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateWordSearchInputSchema = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The desired difficulty of the puzzle, affecting grid size and word complexity."),
  category: z.string().describe("The category of words to include in the puzzle, e.g., 'Animals', 'Programming', 'Food'."),
});
export type GenerateWordSearchInput = z.infer<typeof GenerateWordSearchInputSchema>;

export const GenerateWordSearchOutputSchema = z.object({
  grid: z.array(z.array(z.string())).describe("The 2D grid of letters."),
  words: z.array(z.string()).describe("The list of words hidden in the grid."),
});
export type GenerateWordSearchOutput = z.infer<typeof GenerateWordSearchOutputSchema>;

const generateWordSearchPrompt = ai.definePrompt({
    name: 'generateWordSearchPrompt',
    input: { schema: GenerateWordSearchInputSchema },
    output: { schema: GenerateWordSearchOutputSchema },
    prompt: `You are a puzzle creator specializing in word search games.

    Create a word search puzzle based on the specified difficulty and category.
    - Easy: 8x8 grid, 5-6 words.
    - Medium: 10x10 grid, 7-8 words.
    - Hard: 12x12 grid, 9-10 words.

    The words should fit the category. Words can be placed horizontally, vertically, or diagonally. They can be forward or backward.
    Fill the rest of the grid with random letters.

    Return the grid as a 2D array of strings (letters) and the list of words used.

    Difficulty: {{{difficulty}}}
    Category: {{{category}}}
    `,
});

const generateWordSearchFlow = ai.defineFlow(
    {
        name: 'generateWordSearchFlow',
        inputSchema: GenerateWordSearchInputSchema,
        outputSchema: GenerateWordSearchOutputSchema,
    },
    async (input) => {
        const { output } = await generateWordSearchPrompt(input);
        return output!;
    }
);

export async function generateWordSearch(input: GenerateWordSearchInput): Promise<GenerateWordSearchOutput> {
    return generateWordSearchFlow(input);
}
