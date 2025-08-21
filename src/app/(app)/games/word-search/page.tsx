
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WordSearchLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0">
                 <Image src="https://placehold.co/600x300.png" alt="Word Search Game" width={600} height={300} className="w-full" data-ai-hint="letters grid magnifying glass" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <Search className="h-8 w-8 text-primary"/>
                    Word Search
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                    Find the hidden words in the grid of letters. Words can be horizontal, vertical, or diagonal.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>A grid of letters is generated.</li>
                            <li>A list of words is provided.</li>
                            <li>Find and select the words in the grid.</li>
                            <li>Words can be forwards, backwards, up, down, or diagonal.</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>AI-generated puzzles for endless fun.</li>
                            <li>Multiple difficulty levels.</li>
                            <li>A relaxing way to train your brain.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/word-search/play">
                        <Button className="w-full text-lg py-6">
                            Start Playing <ArrowRight className="ml-2"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
      </div>
    </main>
  );
}
