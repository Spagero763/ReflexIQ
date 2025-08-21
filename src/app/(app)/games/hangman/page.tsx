
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HangmanLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0">
                 <Image src="https://placehold.co/600x300.png" alt="Hangman Game" width={600} height={300} className="w-full" data-ai-hint="gallows minimalist" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <User className="h-8 w-8 text-primary"/>
                    Hangman
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                    Guess the hidden word letter by letter. Be careful, you only have a limited number of incorrect guesses before the man is hanged!
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>A secret word is chosen.</li>
                            <li>Guess letters to reveal the word.</li>
                            <li>Each wrong guess adds a part to the gallows.</li>
                            <li>Win by guessing the word, or lose if the man is hanged.</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Multiple categories of words.</li>
                             <li>Increasing difficulty.</li>
                            <li>Classic and fun gameplay.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/hangman/play">
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
