
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, RotateCw, AlertTriangle } from "lucide-react";
import { AdaptiveDifficultyForm } from "@/components/adaptive-difficulty-form";
import { useState, useEffect, useCallback } from "react";
import { generateTrivia, type GenerateTriviaOutput } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyTrainingPage() {
  const [challenge, setChallenge] = useState<GenerateTriviaOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchChallenge = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);
    try {
      const newChallenge = await generateTrivia({ category: "General Knowledge", difficulty: "Easy" });
      setChallenge(newChallenge);
    } catch (e) {
      setError("Failed to load a new challenge. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);


  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Daily Training</h1>
        <Button onClick={fetchChallenge} variant="outline" size="sm" disabled={loading}>
            <RotateCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            New Challenge
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Today's Quick Challenge</CardTitle>
            <CardDescription>A quick question to get your brain warmed up!</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="bg-secondary p-4 rounded-lg min-h-[100px]">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ) : error ? (
                 <div className="flex flex-col items-center justify-center text-destructive">
                    <AlertTriangle className="h-8 w-8 mb-2" />
                    <p>{error}</p>
                </div>
              ) : (
                <p className="text-lg font-semibold text-secondary-foreground">
                  {challenge?.question}
                </p>
              )}
            </div>
          </CardContent>
          <CardContent>
             {challenge && (
                 showAnswer ? (
                    <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <p className="font-bold">The answer is: {challenge.answer}</p>
                    </div>
                ) : (
                    <Button onClick={() => setShowAnswer(true)} className="w-full bg-primary hover:bg-primary/90" disabled={loading || !!error}>Reveal Answer</Button>
                )
             )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent" />
              <CardTitle>AI Difficulty Adjustment</CardTitle>
            </div>
            <CardDescription>
              Our AI adapts the game's difficulty based on your performance to keep you engaged. 
              See how it works below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdaptiveDifficultyForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
