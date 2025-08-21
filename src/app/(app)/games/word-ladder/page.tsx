
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CaseUpper, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WordLadderLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0">
                 <Image src="https://placehold.co/600x300.png" alt="Word Ladder Game" width={600} height={300} className="w-full" data-ai-hint="words ladder steps" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <CaseUpper className="h-8 w-8 text-primary"/>
                    Word Ladder
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                    Transform one word into another by changing only one letter at a time. Each step must be a valid English word.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>You are given a starting and an ending word.</li>
                            <li>Change one letter in the current word to form a new, valid word.</li>
                            <li>Your goal is to reach the end word.</li>
                            <li>Try to do it in the fewest steps!</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>AI-generated puzzles.</li>
                            <li>Checks if your words are valid in real-time.</li>
                            <li>A great challenge for word lovers.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/word-ladder/play">
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
