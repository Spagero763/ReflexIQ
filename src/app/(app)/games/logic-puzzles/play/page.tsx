
"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Check, RefreshCw, Loader, AlertTriangle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { generateLogicPuzzle, type GenerateLogicPuzzleOutput } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function PuzzlesPage() {
    const [puzzle, setPuzzle] = useState<GenerateLogicPuzzleOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNewPuzzle = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const newPuzzle = await generateLogicPuzzle({ difficulty: "Medium" });
            setPuzzle(newPuzzle);
        } catch (e) {
            setError("Failed to load a new puzzle. Please try again.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNewPuzzle();
    }, [fetchNewPuzzle]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Logic Puzzles</h1>
        <Button onClick={fetchNewPuzzle} variant="outline" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            New Puzzle
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-2xl">
            {loading ? (
                <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="pt-4 space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                    </div>
                    <Skeleton className="h-24 w-full" />
                </div>
            ) : error || !puzzle ? (
                <CardContent className="p-6 text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                    <p className="mt-4 text-lg text-destructive">{error || "Something went wrong."}</p>
                </CardContent>
            ): (
                <>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">{puzzle.title}</CardTitle>
                    <p className="text-muted-foreground pt-2">{puzzle.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-secondary-foreground whitespace-pre-wrap">{puzzle.puzzle}</p>
                    </div>

                    <Textarea placeholder="Describe your solution..." rows={5} className="focus:ring-accent" />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>No time limit. Think carefully!</span>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Check className="h-4 w-4 mr-2" />
                        Submit Solution
                    </Button>
                </CardFooter>
                </>
            )}
        </Card>
      </div>
    </main>
  );
}
