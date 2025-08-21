
import { z } from 'zod';

export const AdjustDifficultyInputSchema = z.object({
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

export const AdjustDifficultyOutputSchema = z.object({
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
