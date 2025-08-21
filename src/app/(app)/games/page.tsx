
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Puzzle, Hash, LayoutGrid, Shuffle, User, VenetianMask, CaseUpper, Search } from "lucide-react";
import Link from "next/link";

const gameCategories = [
    {
        title: "Word Games",
        description: "Challenge your vocabulary and spelling skills.",
        games: [
            {
                href: "/games/word-scramble",
                label: "Word Scramble",
                icon: Shuffle
            },
            {
                href: "/games/hangman",
                label: "Hangman",
                icon: User
            },
            {
                href: "/games/word-ladder",
                label: "Word Ladder",
                icon: CaseUpper
            },
            {
                href: "/games/word-search",
                label: "Word Search",
                icon: Search
            }
        ]
    },
    {
        title: "Logic & Puzzle Games",
        description: "Test your problem-solving and reasoning abilities.",
        games: [
            {
                href: "/games/logic-puzzles",
                label: "Logic Puzzles",
                icon: Puzzle
            },
            {
                href: "/games/memory-game",
                label: "Memory Game",
                icon: LayoutGrid
            },
        ]
    },
     {
        title: "Number Games",
        description: "Put your numerical intuition to the test.",
        games: [
            {
                href: "/games/guess-the-number",
                label: "Guess the Number",
                icon: Hash
            },
        ]
    },
    {
        title: "Trivia & Knowledge",
        description: "How much do you know about the world?",
        games: [
             {
                href: "/trivia",
                label: "Trivia Challenge",
                icon: BrainCircuit
            },
        ]
    }
];


export default function GamesPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Game Hub</h1>
      </div>
      
      <div className="space-y-8">
        {gameCategories.map(category => (
            <div key={category.title}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">{category.title}</h2>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.games.map(game => (
                        <Card key={game.href} className="flex flex-col hover:border-primary transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                     <div className="p-3 bg-secondary rounded-lg">
                                        <game.icon className="h-6 w-6 text-primary" />
                                     </div>
                                    <CardTitle>{game.label}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Link href={game.href} className="w-full">
                                    <Button className="w-full">
                                        Play Now <ArrowRight className="ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
      </div>

    </main>
  );
}
