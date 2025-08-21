"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Check } from "lucide-react";

export default function PuzzlesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Logic Puzzles</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">River Crossing Puzzle</CardTitle>
                <p className="text-muted-foreground pt-2">A classic logic puzzle to test your reasoning.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-secondary-foreground">
                        A farmer wants to cross a river and take with him a wolf, a goat, and a cabbage. He has a boat, but it can only fit himself plus either the wolf, the goat, or the cabbage. If the wolf and the goat are left alone on one shore, the wolf will eat the goat. If the goat and the cabbage are left alone on one shore, the goat will eat the cabbage.
                    </p>
                    <p className="font-semibold mt-2">How can the farmer bring the wolf, the goat, and the cabbage across the river without anything being eaten?</p>
                </div>

                <Textarea placeholder="Describe the steps..." rows={5} className="focus:ring-accent" />
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
        </Card>
      </div>
    </main>
  );
}
