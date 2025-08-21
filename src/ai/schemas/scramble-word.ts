
import { z } from 'zod';

export const GenerateScrambledWordInputSchema = z.object({
  category: z.string().describe("The category for the word, e.g., 'Animals', 'Technology', 'Food'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty, which can influence word length."),
});
export type GenerateScrambledWordInput = z.infer<typeof GenerateScrambledWordInputSchema>;

export const GenerateScrambledWordOutputSchema = z.object({
  originalWord: z.string().describe("The original, unscrambled word."),
  scrambledWord: z.string().describe("The scrambled version of the word."),
});
export type GenerateScrambledWordOutput = z.infer<typeof GenerateScrambledWordOutputSchema>;
