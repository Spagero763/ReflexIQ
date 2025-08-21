
'use server';
/**
 * @fileOverview AI flows for the Word Ladder game.
 *
 * - generateWordLadder - Generates a new word ladder puzzle.
 * - validateWordStep - Validates a single step in a word ladder game.
 */

import { ai } from '@/ai/genkit';
import { GenerateWordLadderInputSchema, GenerateWordLadderOutputSchema, ValidateWordStepInputSchema, ValidateWordStepOutputSchema, type GenerateWordLadderInput, type ValidateWordStepInput, type GenerateWordLadderOutput, type ValidateWordStepOutput } from '@/ai/schemas/word-ladder';


// Prompt for generating a puzzle
const generateLadderPrompt = ai.definePrompt({
    name: 'generateWordLadderPrompt',
    input: { schema: GenerateWordLadderInputSchema },
    output: { schema: GenerateWordLadderOutputSchema },
    prompt: `You are a puzzle master creating a Word Ladder game.
    
    Based on the difficulty, generate a start and end word of the same length.
    - Easy: 3-4 letters.
    - Medium: 4-5 letters.
    - Hard: 5-7 letters.

    The start and end words must be common English words and must have a valid, logical path between them.

    Also provide an optimal path to solve the puzzle. For each step in the path, provide a short reason.

    Difficulty: {{{difficulty}}}
    `,
});

// Prompt for validating a word
const validateStepPrompt = ai.definePrompt({
    name: 'validateWordStepPrompt',
    input: { schema: ValidateWordStepInputSchema },
    output: { schema: ValidateWordStepOutputSchema },
    prompt: `You are the referee for a Word Ladder game. You need to validate a player's move.
    
    A move is valid if:
    1. The proposed word is a real, common English word.
    2. It has the same number of letters as the previous word.
    3. Exactly ONE letter was changed from the previous word.

    Previous Word: {{{previousWord}}}
    Proposed Next Word: {{{nextWord}}}

    Analyze the move and determine if it is valid. Provide a clear reason for your decision.
    `,
});


// Flow for generating a puzzle
const generateWordLadderFlow = ai.defineFlow(
    {
        name: 'generateWordLadderFlow',
        inputSchema: GenerateWordLadderInputSchema,
        outputSchema: GenerateWordLadderOutputSchema,
    },
    async (input) => {
        const { output } = await generateLadderPrompt(input);
        return output!;
    }
);

// Flow for validating a step
const validateWordStepFlow = ai.defineFlow(
    {
        name: 'validateWordStepFlow',
        inputSchema: ValidateWordStepInputSchema,
        outputSchema: ValidateWordStepOutputSchema,
    },
    async (input) => {
        const { output } = await validateStepPrompt(input);
        return output!;
    }
);


// Exported functions to be used in the application
export async function generateWordLadder(input: GenerateWordLadderInput): Promise<GenerateWordLadderOutput> {
    return generateWordLadderFlow(input);
}

export async function validateWordStep(input: ValidateWordStepInput): Promise<ValidateWordStepOutput> {
    return validateWordStepFlow(input);
}
