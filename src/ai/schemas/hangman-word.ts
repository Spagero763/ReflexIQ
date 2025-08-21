
import { z } from 'zod';

export const GenerateHangmanWordInputSchema = z.object({
  category: z.string().describe("The category for the word, e.g., 'Animals', 'Programming', 'Food'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty, which can influence word length and obscurity."),
});
export type GenerateHangmanWordInput = z.infer<typeof GenerateHangmanWordInputSchema>;

export const GenerateHangmanWordOutputSchema = z.object({
  word: z.string().describe("A single word for the Hangman game, returned in uppercase."),
});
export type GenerateHangmanWordOutput = z.infer<typeof GenerateHangmanWordOutputSchema>;
