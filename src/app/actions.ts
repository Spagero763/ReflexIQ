
"use server";

import { adjustDifficulty } from "@/ai/flows/adaptive-difficulty";
import { generateWordLadder as generateWordLadderFlow, validateWordStep as validateWordStepFlow, type GenerateWordLadderInput, type ValidateWordStepInput } from "@/ai/flows/word-ladder";
import { generateWordSearch as generateWordSearchFlow, type GenerateWordSearchInput } from "@/ai/flows/word-search";
import { generateTriviaQuestion as generateTriviaFlow, type GenerateTriviaInput } from "@/ai/flows/trivia";
import { generateLogicPuzzle as generateLogicPuzzleFlow, type GenerateLogicPuzzleInput } from "@/ai/flows/generate-logic-puzzle";
import { generateHangmanWord as generateHangmanWordFlow, type GenerateHangmanWordInput } from "@/ai/flows/hangman-word";
import { generateScrambledWord as generateScrambledWordFlow, type GenerateScrambledWordInput } from "@/ai/flows/scramble-word";

export type { GenerateWordLadderOutput, WordLadderPathItem } from "@/ai/flows/word-ladder";
export type { GenerateWordSearchOutput } from "@/ai/flows/word-search";
export type { GenerateTriviaOutput, GenerateTriviaInput } from "@/ai/flows/trivia";
export type { GenerateLogicPuzzleOutput } from "@/ai/flows/generate-logic-puzzle";
export type { GenerateHangmanWordOutput } from "@/ai/flows/hangman-word";
export type { GenerateScrambledWordOutput } from "@/ai/flows/scramble-word";


export async function getAdjustedDifficulty(input: any) {
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
