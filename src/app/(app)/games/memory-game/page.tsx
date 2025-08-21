
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ArrowRight, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MemoryGameLandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 lg:p-6">
      <div className="max-w-2xl w-full">
        <Card className="overflow-hidden">
             <CardHeader className="p-0 relative">
                 <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground p-2 rounded-lg z-10 backdrop-blur-sm">
                    <BrainCircuit className="h-6 w-6" />
                 </div>
                 <Image src="https://placehold.co/600x300.png" alt="Memory Game" width={600} height={300} className="w-full" data-ai-hint="matching cards brain" />
            </CardHeader>
            <div className="p-6">
                <CardTitle className="flex items-center gap-3 text-3xl mb-2">
                    <LayoutGrid className="h-8 w-8 text-primary"/>
                    Memory Game
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                    Flip cards to find matching pairs. Test your memory and concentration in this classic game. How quickly can you clear the board?
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">How to Play:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The board is filled with pairs of cards, face down.</li>
                            <li>Flip over two cards at a time.</li>
                            <li>If they match, they stay face up.</li>
                            <li>If not, they flip back over.</li>
                            <li>Find all pairs to win!</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Sleek and simple card designs.</li>
                            <li>Tracks your number of moves.</li>
                            <li>A fun mental workout.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-8">
                    <Link href="/games/memory-game/play">
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
