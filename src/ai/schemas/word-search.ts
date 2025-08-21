
import { z } from 'zod';

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
