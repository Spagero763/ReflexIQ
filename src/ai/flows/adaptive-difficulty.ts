'use server';
/**
 * @fileOverview Dynamically adjusts the difficulty of the trivia and puzzles based on user performance.
 *
 * - adjustDifficulty - A function that adjusts the difficulty based on user performance.
 * - AdjustDifficultyInput - The input type for the adjustDifficulty function.
 * - AdjustDifficultyOutput - The return type for the adjustDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustDifficultyInputSchema = z.object({
  userPerformance: z
    .number()
    .describe(
      'A numerical value representing the user performance. Higher value indicates better performance.'
    ),
  currentDifficulty: z
    .string()
    .describe(
      'The current difficulty level of the game. Possible values: Easy, Medium, Hard.'
    ),
});
export type AdjustDifficultyInput = z.infer<typeof AdjustDifficultyInputSchema>;

const AdjustDifficultyOutputSchema = z.object({
  newDifficulty: z
    .string()
    .describe(
      'The new difficulty level of the game, adjusted based on user performance. Possible values: Easy, Medium, Hard.'
    ),
  reason: z
    .string()
    .describe(
      'The reason for the difficulty adjustment based on the performance.'
    ),
});
export type AdjustDifficultyOutput = z.infer<typeof AdjustDifficultyOutputSchema>;

export async function adjustDifficulty(input: AdjustDifficultyInput): Promise<AdjustDifficultyOutput> {
  return adjustDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustDifficultyPrompt',
  input: {schema: AdjustDifficultyInputSchema},
  output: {schema: AdjustDifficultyOutputSchema},
  prompt: `You are an AI game master, adept at creating the perfect game experience.

You will be provided with the user's recent performance, and the current difficulty.

Based on this, set the newDifficulty to Easy, Medium, or Hard. If the userPerformance is very high, increase the difficulty. If the userPerformance is very low, decrease the difficulty. If the userPerformance is in a normal range, keep the difficulty the same.

User Performance: {{{userPerformance}}}
Current Difficulty: {{{currentDifficulty}}}

Explain the reason for the adjustment in the reason field.
`,
});

const adjustDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustDifficultyFlow',
    inputSchema: AdjustDifficultyInputSchema,
    outputSchema: AdjustDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
