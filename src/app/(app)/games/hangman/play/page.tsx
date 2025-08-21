
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw, User, Trophy, Frown, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateHangmanWord } from '@/app/actions';

const MAX_INCORRECT_GUESSES = 6;

const HangmanDrawing = ({ numberOfGuesses }: { numberOfGuesses: number }) => {
    const head = (
        <div key="head" className="w-12 h-12 border-4 border-foreground rounded-full absolute top-[50px] right-[-24px]" />
    );
    const body = (
        <div key="body" className="w-1 h-24 bg-foreground absolute top-[100px] right-0" />
    );
    const rightArm = (
        <div key="rightArm" className="w-20 h-1 bg-foreground absolute top-[120px] right-[-80px] rotate-[-30deg] origin-bottom-left" />
    );
    const leftArm = (
        <div key="leftArm" className="w-20 h-1 bg-foreground absolute top-[120px] right-[4px] rotate-[30deg] origin-bottom-right" />
    );
    const rightLeg = (
        <div key="rightLeg" className="w-24 h-1 bg-foreground absolute top-[215px] right-[-92px] rotate-[60deg] origin-bottom-left" />
    );
    const leftLeg = (
        <div key="leftLeg" className="w-24 h-1 bg-foreground absolute top-[215px] right-[0px] rotate-[-60deg] origin-bottom-right" />
    );

    const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg];

    return (
        <div className="relative h-80">
            {bodyParts.slice(0, numberOfGuesses)}
            <div className="h-[50px] w-1 bg-foreground absolute top-0 right-0" />
            <div className="h-1 w-48 bg-foreground ml-28" />
            <div className="h-80 w-1 bg-foreground ml-28" />
            <div className="h-1 w-64 bg-foreground" />
        </div>
    );
};

export default function HangmanPage() {
    const [wordToGuess, setWordToGuess] = useState("");
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    const incorrectGuesses = guessedLetters.filter(
        letter => !wordToGuess.includes(letter)
    );
    
    const isLoser = incorrectGuesses.length >= MAX_INCORRECT_GUESSES;
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter)) && wordToGuess !== "";

    const startGame = useCallback(async () => {
        setLoading(true);
        setGuessedLetters([]);
        try {
            const { word } = await generateHangmanWord({ category: "General", difficulty: "Medium" });
            setWordToGuess(word.toUpperCase());
        } catch (error) {
            console.error("Failed to fetch new word", error);
            // Fallback to a default word in case of API error
            setWordToGuess("GENKIT");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        startGame();
    }, [startGame]);

    const addGuessedLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return;
        setGuessedLetters(currentLetters => [...currentLetters, letter]);
    }, [guessedLetters, isWinner, isLoser]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            if (!key.match(/^[A-Z]$/)) return;
            e.preventDefault();
            addGuessedLetter(key);
        };
        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [addGuessedLetter]);

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:p-6">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <User /> Hangman
                        </div>
                        <Button onClick={startGame} variant="outline" size="sm" disabled={loading}>
                            <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> New Game
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[400px]">
                    <div className="flex justify-center">
                        <HangmanDrawing numberOfGuesses={incorrectGuesses.length} />
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        {isWinner && (
                             <Alert variant="default" className="bg-green-100 border-green-500 text-green-800">
                                <Trophy className="h-4 w-4 !text-green-800" />
                                <AlertTitle>You Won!</AlertTitle>
                                <AlertDescription>
                                    Congratulations! Click 'New Game' to play again.
                                </AlertDescription>
                            </Alert>
                        )}
                        {isLoser && (
                            <Alert variant="destructive">
                                <Frown className="h-4 w-4" />
                                <AlertTitle>You Lost!</AlertTitle>
                                <AlertDescription>
                                    The word was "{wordToGuess}". Better luck next time.
                                </AlertDescription>
                            </Alert>
                        )}

                        {loading ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader className="h-6 w-6 animate-spin" />
                                <p>Generating a new word...</p>
                            </div>
                        ): (
                            <div className="flex gap-2 text-4xl font-bold tracking-widest">
                                {wordToGuess.split("").map((letter, index) => (
                                    <span key={index} className="border-b-4 border-foreground w-10 text-center">
                                        <span className={cn(
                                            "transition-opacity",
                                            guessedLetters.includes(letter) || isLoser ? "opacity-100" : "opacity-0"
                                        )}>
                                            {letter}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(key => {
                                const isActive = guessedLetters.includes(key);
                                const isInactive = !wordToGuess.includes(key) && isActive;
                                return (
                                    <Button
                                        key={key}
                                        size="icon"
                                        variant={isActive ? (isInactive ? 'destructive' : 'outline') : 'outline'}
                                        onClick={() => addGuessedLetter(key)}
                                        disabled={isActive || isWinner || isLoser || loading}
                                        className={cn("text-lg", isActive && !isInactive && "bg-green-200 text-green-800")}
                                    >
                                        {key}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
