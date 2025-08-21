
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WordScrambleLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0">
                 <Image src="https://placehold.co/600x300.png" alt="Word Scramble Game" width={600} height={300} className="w-full" data-ai-hint="alphabet letters jumbled" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <Shuffle className="h-8 w-8 text-primary"/>
                    Word Scramble
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                   Unscramble the letters to form a valid word. It's a great way to test your vocabulary and pattern recognition skills!
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>You are given a set of scrambled letters.</li>
                            <li>Rearrange them to form a correct word.</li>
                            <li>Submit your answer to see if you're right.</li>
                            <li>Challenge yourself with new words!</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Large dictionary of words.</li>
                             <li>Hints to help you when you're stuck.</li>
                            <li>Score tracking to monitor your progress.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/word-scramble/play">
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
