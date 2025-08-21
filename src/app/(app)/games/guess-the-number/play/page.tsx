
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Frown, Smile, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MAX_NUMBER = 100;

export default function GuessTheNumberPage() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    resetGame();
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * MAX_NUMBER) + 1);
    setGuess("");
    setMessage(`Guess a number between 1 and ${MAX_NUMBER}`);
    setAttempts(0);
    setGameOver(false);
  };
  
  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > MAX_NUMBER) {
      toast({
        title: "Invalid Input",
        description: `Please enter a number between 1 and ${MAX_NUMBER}.`,
        variant: "destructive",
      });
      return;
    }

    setAttempts(prev => prev + 1);
    
    if (numGuess === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage("Too low! Try a higher number.");
    } else {
      setMessage("Too high! Try a lower number.");
    }
    setGuess("");
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Guess the Number</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
                <Gamepad2 className="h-8 w-8 text-primary" />
                Guess The Number!
            </CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); handleGuess(); }}>
              <Input
                type="number"
                placeholder="Enter your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={gameOver}
                className="text-center text-lg h-12"
              />
            </form>
             <div className="text-center text-sm text-muted-foreground">
                Attempts: {attempts}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!gameOver ? (
              <Button onClick={handleGuess} className="w-full bg-primary hover:bg-primary/90">
                Submit Guess
              </Button>
            ) : (
                <div className="flex items-center text-green-600 font-bold text-lg">
                    <Smile className="h-6 w-6 mr-2"/> Great Job!
                </div>
            )}
             <Button onClick={resetGame} variant="outline" className="w-full">
              {gameOver ? "Play Again" : "Reset Game"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
