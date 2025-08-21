
import { z } from 'zod';

export const GenerateLogicPuzzleInputSchema = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty of the puzzle."),
});
export type GenerateLogicPuzzleInput = z.infer<typeof GenerateLogicPuzzleInputSchema>;

export const GenerateLogicPuzzleOutputSchema = z.object({
  title: z.string().describe("The title of the logic puzzle."),
  description: z.string().describe("A short, one-sentence description of the puzzle's goal."),
  puzzle: z.string().describe("The full text of the puzzle, including the scenario and constraints."),
  solution: z.string().describe("A possible solution to the puzzle."),
});
export type GenerateLogicPuzzleOutput = z.infer<typeof GenerateLogicPuzzleOutputSchema>;
