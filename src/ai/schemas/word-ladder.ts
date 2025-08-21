
import { z } from 'zod';

// Schema for generating a puzzle
export const GenerateWordLadderInputSchema = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The desired difficulty of the puzzle, affecting word length and complexity."),
});
export type GenerateWordLadderInput = z.infer<typeof GenerateWordLadderInputSchema>;

export const WordLadderPathItemSchema = z.object({
    word: z.string().describe("A word in the ladder path."),
    reason: z.string().describe("A brief explanation of why this word is a good step from the previous one.")
});
export type WordLadderPathItem = z.infer<typeof WordLadderPathItemSchema>;


export const GenerateWordLadderOutputSchema = z.object({
  startWord: z.string().describe("The starting word of the ladder."),
  endWord: z.string().describe("The target word of the ladder."),
  optimalPath: z.array(WordLadderPathItemSchema).describe("An optimal path from the start to the end word."),
});
export type GenerateWordLadderOutput = z.infer<typeof GenerateWordLadderOutputSchema>;


// Schema for validating a step
export const ValidateWordStepInputSchema = z.object({
  previousWord: z.string().describe("The previous word in the user's path."),
  nextWord: z.string().describe("The user's proposed next word in the ladder."),
});
export type ValidateWordStepInput = z.infer<typeof ValidateWordStepInputSchema>;

export const ValidateWordStepOutputSchema = z.object({
  isValid: z.boolean().describe("Whether the proposed next word is a valid move."),
  reason: z.string().describe("The reason why the move is valid or invalid. E.g., 'Not a valid English word', 'Changed more than one letter', or 'Valid word'."),
});
export type ValidateWordStepOutput = z.infer<typeof ValidateWordStepOutputSchema>;
