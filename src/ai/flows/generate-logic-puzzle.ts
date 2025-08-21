
'use server';
/**
 * @fileOverview AI flow for generating logic puzzles.
 *
 * - generateLogicPuzzle - Generates a new logic puzzle.
 */

import { ai } from '@/ai/genkit';
import { GenerateLogicPuzzleInputSchema, GenerateLogicPuzzleOutputSchema, type GenerateLogicPuzzleInput, type GenerateLogicPuzzleOutput } from '@/ai/schemas/generate-logic-puzzle';


const generatePuzzlePrompt = ai.definePrompt({
    name: 'generateLogicPuzzlePrompt',
    input: { schema: GenerateLogicPuzzleInputSchema },
    output: { schema: GenerateLogicPuzzleOutputSchema },
    prompt: `You are an expert puzzle creator, specializing in logic and deduction puzzles.

    Generate a single, unique logic puzzle based on the provided difficulty.
    The puzzle must be self-contained and solvable using only the information given.
    
    - The 'title' should be catchy and relevant.
    - The 'description' should be a single sentence summarizing the objective.
    - The 'puzzle' field should contain the full puzzle text, including the setup, the characters/items, and all the rules or clues needed to solve it.
    - The 'solution' should explain the correct answer and the logical steps to reach it.

    Do not generate a common or well-known puzzle (like the river crossing puzzle). Create something original.

    Difficulty: {{{difficulty}}}
    `,
});

const generateLogicPuzzleFlow = ai.defineFlow(
    {
        name: 'generateLogicPuzzleFlow',
        inputSchema: GenerateLogicPuzzleInputSchema,
        outputSchema: GenerateLogicPuzzleOutputSchema,
    },
    async (input) => {
        const { output } = await generatePuzzlePrompt(input);
        return output!;
    }
);

export async function generateLogicPuzzle(input: GenerateLogicPuzzleInput): Promise<GenerateLogicPuzzleOutput> {
    return generateLogicPuzzleFlow(input);
}
