
import { z } from 'zod';

export const GenerateTriviaInputSchema = z.object({
  category: z.string().describe("The category of the trivia question, e.g., 'Science', 'History', 'Movies'."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty of the question."),
});
export type GenerateTriviaInput = z.infer<typeof GenerateTriviaInputSchema>;

export const GenerateTriviaOutputSchema = z.object({
  question: z.string().describe("The trivia question."),
  options: z.array(z.string()).describe("A list of 4 possible answers."),
  answer: z.string().describe("The correct answer from the options."),
  category: z.string().describe("The category of the question generated."),
});
export type GenerateTriviaOutput = z.infer<typeof GenerateTriviaOutputSchema>;
