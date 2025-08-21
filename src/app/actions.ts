
"use server";

import { adjustDifficulty, type AdjustDifficultyInput } from "@/ai/flows/adaptive-difficulty";
import { generateWordLadder, validateWordStep, type GenerateWordLadderInput, type ValidateWordStepInput } from "@/ai/flows/word-ladder";
import { generateWordSearch, type GenerateWordSearchInput } from "@/ai/flows/word-search";
import { generateTriviaQuestion, type GenerateTriviaInput } from "@/ai/flows/trivia";

export type { GenerateWordLadderOutput, WordLadderPathItem } from "@/ai/flows/word-ladder";
export type { GenerateWordSearchOutput } from "@/ai/flows/word-search";
export type { GenerateTriviaOutput } from "@/ai/flows/trivia";


export async function getAdjustedDifficulty(input: AdjustDifficultyInput) {
  try {
    const output = await adjustDifficulty(input);
    return output;
  } catch (e: any) {
    console.error(e);
    throw new Error(`Failed to adjust difficulty: ${e.message}`);
  }
}

export async function generateWordLadder(input: GenerateWordLadderInput) {
    try {
        const output = await generateWordLadder(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate word ladder: ${e.message}`);
    }
}

export async function validateWordStep(input: ValidateWordStepInput) {
    try {
        const output = await validateWordStep(input);
        return output;
    } catch (e: any)
{
        console.error(e);
        throw new Error(`Failed to validate word step: ${e.message}`);
    }
}

export async function generateWordSearch(input: GenerateWordSearchInput) {
    try {
        const output = await generateWordSearch(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate word search: ${e.message}`);
    }
}

export async function generateTrivia(input: GenerateTriviaInput) {
    try {
        const output = await generateTriviaQuestion(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate trivia question: ${e.message}`);
    }
}
