
'use server';
/**
 * @fileOverview AI flows for the Word Ladder game.
 *
 * - generateWordLadder - Generates a new word ladder puzzle.
 * - validateWordStep - Validates a single step in a word ladder game.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schema for generating a puzzle
const GenerateWordLadderInputSchema = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The desired difficulty of the puzzle, affecting word length and complexity."),
});
export type GenerateWordLadderInput = z.infer<typeof GenerateWordLadderInputSchema>;

const WordLadderPathItemSchema = z.object({
    word: z.string().describe("A word in the ladder path."),
    reason: z.string().describe("A brief explanation of why this word is a good step from the previous one.")
});
export type WordLadderPathItem = z.infer<typeof WordLadderPathItemSchema>;


const GenerateWordLadderOutputSchema = z.object({
  startWord: z.string().describe("The starting word of the ladder."),
  endWord: z.string().describe("The target word of the ladder."),
  optimalPath: z.array(WordLadderPathItemSchema).describe("An optimal path from the start to the end word."),
});
export type GenerateWordLadderOutput = z.infer<typeof GenerateWordLadderOutputSchema>;


// Schema for validating a step
const ValidateWordStepInputSchema = z.object({
  previousWord: z.string().describe("The previous word in the user's path."),
  nextWord: z.string().describe("The user's proposed next word in the ladder."),
});
export type ValidateWordStepInput = z.infer<typeof ValidateWordStepInputSchema>;

const ValidateWordStepOutputSchema = z.object({
  isValid: z.boolean().describe("Whether the proposed next word is a valid move."),
  reason: z.string().describe("The reason why the move is valid or invalid. E.g., 'Not a valid English word', 'Changed more than one letter', or 'Valid word'."),
});
export type ValidateWordStepOutput = z.infer<typeof ValidateWordStepOutputSchema>;


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

