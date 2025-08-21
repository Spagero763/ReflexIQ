
'use server';
/**
 * @fileOverview AI flow for generating Word Search puzzles.
 *
 * - generateWordSearch - Generates a new word search puzzle.
 */

import { ai } from '@/ai/genkit';
import { GenerateWordSearchInputSchema, GenerateWordSearchOutputSchema, type GenerateWordSearchInput, type GenerateWordSearchOutput } from '@/ai/schemas/word-search';


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
