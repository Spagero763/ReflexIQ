
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateWordLadder, validateWordStep, GenerateWordLadderOutput, WordLadderPathItem } from "@/app/actions";
import { Loader, RefreshCw, CaseUpper, Trophy, Lightbulb } from "lucide-react";

export default function WordLadderPlayPage() {
  const [puzzle, setPuzzle] = useState<GenerateWordLadderOutput | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWinner, setIsWinner] = useState(false);

  const startNewGame = async () => {
    setLoading(true);
    setError(null);
    setIsWinner(false);
    try {
      const newPuzzle = await generateWordLadder({ difficulty: "Medium" });
      setPuzzle(newPuzzle);
      setPath([newPuzzle.startWord]);
      setCurrentWord("");
    } catch (e) {
      setError("Failed to generate a new puzzle. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!puzzle || currentWord.length !== puzzle.startWord.length) {
        setError(`Your guess must be ${puzzle?.startWord.length} letters long.`);
        return;
    }

    setError(null);
    const prevWord = path[path.length - 1];

    try {
      const validation = await validateWordStep({
        previousWord: prevWord,
        nextWord: currentWord,
      });

      if (validation.isValid) {
        const newPath = [...path, currentWord];
        setPath(newPath);

        if (currentWord.toLowerCase() === puzzle.endWord.toLowerCase()) {
          setIsWinner(true);
        }
        
        setCurrentWord("");

      } else {
        setError(validation.reason);
      }
    } catch (e) {
        setError("There was an issue validating your word. Please try again.");
        console.error(e);
    }
  };

  if (loading) {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:p-6">
            <Loader className="h-8 w-8 animate-spin text-primary"/>
            <p className="text-muted-foreground">Generating a new puzzle...</p>
        </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <CaseUpper className="text-primary"/> Word Ladder
            </div>
            <Button onClick={startNewGame} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4"/> New Game
            </Button>
          </CardTitle>
          <CardDescription>
            Change one letter at a time to get from <strong>{puzzle?.startWord.toUpperCase()}</strong> to <strong>{puzzle?.endWord.toUpperCase()}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="bg-secondary p-4 rounded-lg min-h-[100px] flex flex-col gap-1 items-center justify-center">
                {path.map((word, index) => (
                    <p key={index} className="text-2xl font-bold tracking-widest text-secondary-foreground">
                        {word.toUpperCase()}
                    </p>
                ))}
            </div>

            {isWinner ? (
                <Alert variant="default" className="bg-green-100 border-green-500 text-green-800">
                    <Trophy className="h-4 w-4 !text-green-800" />
                    <AlertTitle>Congratulations!</AlertTitle>
                    <AlertDescription>
                        You reached the end word in {path.length - 1} steps!
                    </AlertDescription>
                </Alert>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input 
                        value={currentWord}
                        onChange={e => setCurrentWord(e.target.value.toLowerCase())}
                        maxLength={puzzle?.startWord.length}
                        placeholder="Next word..."
                        className="text-center text-lg h-12"
                    />
                    <Button type="submit" className="h-12">Submit</Button>
                </form>
            )}
             {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Steps: {path.length - 1}</p>
            {puzzle && !isWinner &&
              <Button variant="ghost" disabled>
                  <Lightbulb className="mr-2" /> Optimal: {puzzle.optimalPath.length -1} steps
              </Button>
            }
        </CardFooter>
      </Card>
    </main>
  );
}
