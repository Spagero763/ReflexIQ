
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GuessTheNumberLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0">
                 <Image src="https://placehold.co/600x300.png" alt="Guess the number Game" width={600} height={300} className="w-full" data-ai-hint="question mark numbers" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <Hash className="h-8 w-8 text-primary"/>
                    Guess the Number
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                   A secret number has been chosen. Can you guess it in the fewest attempts? You'll get hints if your guess is too high or too low.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The AI picks a number between 1 and 100.</li>
                            <li>You enter your guess.</li>
                            <li>The AI tells you if your guess is high or low.</li>
                            <li>Keep guessing until you find the number!</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Simple and intuitive gameplay.</li>
                             <li>Tracks your number of attempts.</li>
                            <li>A great way to test your intuition.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/guess-the-number/play">
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
