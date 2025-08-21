"use server";

import { adjustDifficulty, type AdjustDifficultyInput } from "@/ai/flows/adaptive-difficulty";

export async function getAdjustedDifficulty(input: AdjustDifficultyInput) {
  try {
    const output = await adjustDifficulty(input);
    return output;
  } catch (e: any) {
    console.error(e);
    throw new Error(`Failed to adjust difficulty: ${e.message}`);
  }
}
