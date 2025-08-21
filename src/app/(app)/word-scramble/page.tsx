"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const words = ["react", "nextjs", "tailwind", "genkit", "firebase", "javascript", "typescript", "component", "developer"];

const scrambleWord = (word: string) => {
  const a = word.split("");
  const n = a.length;
  // Ensure the scrambled word is not the same as the original, unless it's a very short word.
  if (n < 3) return a.sort(() => Math.random() - 0.5).join("");

  let scrambledWord;
  do {
    // Fisher-Yates shuffle
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    scrambledWord = a.join("");
  } while (scrambledWord === word);
  
  return scrambledWord;
};

export default function WordScramblePage() {
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const newWord = useCallback(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
    setGuess("");
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    newWord();
  }, [newWord]);

  const handleGuess = () => {
    if (!guess) {
        toast({ title: "Please enter a word.", variant: "destructive" });
        return;
    }

    if (guess.toLowerCase() === originalWord) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setTimeout(() => {
        newWord();
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  };
  
  const handleShowHint = () => {
      toast({
          title: "Hint",
          description: `The word starts with '${originalWord[0]}' and has ${originalWord.length} letters.`
      });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Word Scramble</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Unscramble the Word</CardTitle>
            <CardDescription>Use the letters to form a meaningful word. Current Score: {score}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center bg-secondary p-8 rounded-lg">
                <p className="text-4xl font-bold tracking-widest text-secondary-foreground">{scrambledWord.toUpperCase()}</p>
            </div>
             <form onSubmit={(e) => { e.preventDefault(); handleGuess(); }} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Your guess..."
                    value={guess}
                    onChange={(e) => {
                        setGuess(e.target.value);
                        if (isCorrect !== null) setIsCorrect(null);
                    }}
                    disabled={isCorrect === true}
                    className={cn(
                        "text-center text-lg h-12",
                        isCorrect === true && "border-green-500",
                        isCorrect === false && "border-red-500"
                    )}
                />
                <Button type="submit" disabled={isCorrect === true} className="h-12">Submit</Button>
            </form>
            {isCorrect === true && (
                <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
                    <CheckCircle /> Correct! Well done.
                </p>
            )}
            {isCorrect === false && (
                <p className="text-red-600 font-semibold flex items-center justify-center gap-2">
                    <XCircle /> Not quite. Try again!
                </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleShowHint} variant="ghost" disabled={isCorrect === true}>
                <Lightbulb className="mr-2" />
                Hint
            </Button>
            <Button onClick={newWord} variant="outline">
              <RefreshCw className="mr-2" />
              New Word
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
