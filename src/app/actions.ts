
"use server";

import { adjustDifficulty } from "@/ai/flows/adaptive-difficulty";
import { generateWordLadder as generateWordLadderFlow, validateWordStep as validateWordStepFlow } from "@/ai/flows/word-ladder";
import { generateWordSearch as generateWordSearchFlow } from "@/ai/flows/word-search";
import { generateTriviaQuestion as generateTriviaFlow } from "@/ai/flows/trivia";
import { generateLogicPuzzle as generateLogicPuzzleFlow } from "@/ai/flows/generate-logic-puzzle";
import { generateHangmanWord as generateHangmanWordFlow } from "@/ai/flows/hangman-word";
import { generateScrambledWord as generateScrambledWordFlow } from "@/ai/flows/scramble-word";

import type { GenerateWordLadderInput, ValidateWordStepInput, GenerateWordLadderOutput, WordLadderPathItem } from "@/ai/schemas/word-ladder";
import type { GenerateWordSearchInput, GenerateWordSearchOutput } from "@/ai/schemas/word-search";
import type { GenerateTriviaOutput, GenerateTriviaInput } from "@/ai/schemas/trivia";
import type { GenerateLogicPuzzleInput, GenerateLogicPuzzleOutput } from "@/ai/schemas/generate-logic-puzzle";
import type { GenerateHangmanWordInput, GenerateHangmanWordOutput } from "@/ai/schemas/hangman-word";
import type { GenerateScrambledWordInput, GenerateScrambledWordOutput } from "@/ai/schemas/scramble-word";
import type { AdjustDifficultyInput, AdjustDifficultyOutput } from "@/ai/schemas/adaptive-difficulty";

export type { GenerateWordLadderOutput, WordLadderPathItem };
export type { GenerateWordSearchOutput };
export type { GenerateTriviaOutput, GenerateTriviaInput };
export type { GenerateLogicPuzzleOutput };
export type { GenerateHangmanWordOutput };
export type { GenerateScrambledWordOutput };
export type { AdjustDifficultyOutput };


export async function getAdjustedDifficulty(input: AdjustDifficultyInput): Promise<AdjustDifficultyOutput> {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid input: difficulty adjustment input must be a valid object');
  }
  
  try {
    const output = await adjustDifficulty(input);
    if (!output) {
      throw new Error('No output received from difficulty adjustment service');
    }
    return output;
  } catch (e: any) {
    console.error('Difficulty adjustment error:', e);
    throw new Error(`Failed to adjust difficulty: ${e?.message || 'Unknown error'}`);
  }
}

export async function generateWordLadder(input: GenerateWordLadderInput) {
    try {
        const output = await generateWordLadderFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate word ladder: ${e.message}`);
    }
}

export async function validateWordStep(input: ValidateWordStepInput) {
    try {
        const output = await validateWordStepFlow(input);
        return output;
    } catch (e: any)
{
        console.error(e);
        throw new Error(`Failed to validate word step: ${e.message}`);
    }
}

export async function generateWordSearch(input: GenerateWordSearchInput) {
    try {
        const output = await generateWordSearchFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate word search: ${e.message}`);
    }
}

export async function generateTrivia(input: GenerateTriviaInput) {
    try {
        const output = await generateTriviaFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate trivia question: ${e.message}`);
    }
}

export async function generateLogicPuzzle(input: GenerateLogicPuzzleInput) {
    try {
        const output = await generateLogicPuzzleFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate logic puzzle: ${e.message}`);
    }
}

export async function generateHangmanWord(input: GenerateHangmanWordInput) {
    try {
        const output = await generateHangmanWordFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate hangman word: ${e.message}`);
    }
}

export async function generateScrambledWord(input: GenerateScrambledWordInput) {
    try {
        const output = await generateScrambledWordFlow(input);
        return output;
    } catch (e: any) {
        console.error(e);
        throw new Error(`Failed to generate scrambled word: ${e.message}`);
    }
}
