
"use client";
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, RefreshCw, Search, Lightbulb } from 'lucide-react';
import { generateWordSearch, GenerateWordSearchOutput } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

type Selection = {
    row: number;
    col: number;
};

export default function WordSearchPlayPage() {
    const [puzzle, setPuzzle] = useState<GenerateWordSearchOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selection, setSelection] = useState<Selection[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [hintedCells, setHintedCells] = useState<Selection[]>([]);
    const { toast } = useToast();

    const startNewGame = useCallback(async () => {
        setLoading(true);
        setError(null);
        setFoundWords([]);
        setSelection([]);
        setHintedCells([]);
        try {
            const newPuzzle = await generateWordSearch({ category: 'Common', difficulty: 'Medium' });
            setPuzzle(newPuzzle);
        } catch (e) {
            setError("Failed to generate a new puzzle. Please try again.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleCellClick = (row: number, col: number) => {
        const isSelected = selection.some(s => s.row === row && s.col === col);
        if (isSelected) {
            setSelection(selection.filter(s => !(s.row === row && s.col === col)));
        } else {
            setSelection([...selection, { row, col }]);
        }
    };
    
    const checkSelection = () => {
        if (selection.length < 2 || !puzzle) return;

        let selectedWord = "";
        const sortedSelection = [...selection].sort((a, b) => {
            if (a.row !== b.row) return a.row - b.row;
            return a.col - b.col;
        });

        sortedSelection.forEach(s => {
            selectedWord += puzzle.grid[s.row][s.col];
        });
        
        const reversedSelectedWord = selectedWord.split('').reverse().join('');

        const wordToFind = puzzle.words.find(w => w.toUpperCase() === selectedWord || w.toUpperCase() === reversedSelectedWord);

        if (wordToFind) {
            if (!foundWords.includes(wordToFind)) {
                setFoundWords([...foundWords, wordToFind]);
            }
        } else {
            toast({
                title: "Not a word",
                description: "That selection doesn't match any words.",
                variant: "destructive",
            })
        }
        setSelection([]);
    };

    const showHint = () => {
        if (!puzzle) return;
        const unfoundWords = puzzle.words.filter(w => !foundWords.includes(w));
        if (unfoundWords.length === 0) return;

        const wordToHint = unfoundWords[0];
        // This is a simplification. A real implementation would need to know the start coords of each word.
        // For now, let's just find the first letter on the grid.
        for(let r=0; r<puzzle.grid.length; r++) {
            for(let c=0; c<puzzle.grid[r].length; c++) {
                if (puzzle.grid[r][c] === wordToHint[0].toUpperCase()) {
                    setHintedCells([{row: r, col: c}]);
                    toast({title: "Hint", description: `The first letter of an unfound word is highlighted.`})
                    setTimeout(() => setHintedCells([]), 2000);
                    return;
                }
            }
        }
    };

    if (loading) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:p-6">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating a new puzzle...</p>
            </main>
        )
    }

    const isGameWon = puzzle && foundWords.length === puzzle.words.length;

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:p-6">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Search /> Word Search
                        </div>
                         <div className="flex gap-2">
                            <Button onClick={showHint} variant="ghost" size="sm" disabled={isGameWon || loading}>
                                <Lightbulb className="mr-2 h-4 w-4" /> Hint
                            </Button>
                            <Button onClick={startNewGame} variant="outline" size="sm">
                                <RefreshCw className="mr-2 h-4 w-4" /> New Game
                            </Button>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Find all the hidden words in the grid.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-2 flex justify-center items-center">
                        <div className="grid gap-1 bg-secondary p-2 rounded-lg" style={{gridTemplateColumns: `repeat(${puzzle?.grid[0].length || 10}, minmax(0, 1fr))`}}>
                           {puzzle?.grid.map((row, rowIndex) => (
                                row.map((cell, colIndex) => {
                                    const isSelected = selection.some(s => s.row === rowIndex && s.col === colIndex);
                                    const isHinted = hintedCells.some(h => h.row === rowIndex && h.col === colIndex);
                                    return (
                                        <div 
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            className={cn(
                                                "aspect-square flex items-center justify-center rounded-md cursor-pointer select-none font-bold text-lg transition-colors",
                                                isSelected ? "bg-primary text-primary-foreground" : "bg-card hover:bg-card/80",
                                                isHinted && "bg-accent text-accent-foreground animate-pulse"
                                            )}
                                        >
                                            {cell}
                                        </div>
                                    )
                                })
                           ))}
                        </div>
                    </div>
                     <div className="col-span-1">
                        <h3 className="font-bold text-lg mb-4 text-primary">Words to Find:</h3>
                        <ul className="space-y-2">
                           {puzzle?.words.map(word => (
                               <li key={word} className={cn(
                                   "text-muted-foreground transition-all",
                                   foundWords.includes(word) && "line-through text-green-500 font-semibold"
                               )}>
                                   {word}
                               </li>
                           ))}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4">
                     <Button onClick={checkSelection} disabled={selection.length < 2}>
                        Check Selection
                    </Button>
                    {isGameWon && (
                        <p className="text-green-600 font-bold text-lg">Congratulations! You found all the words!</p>
                    )}
                </CardFooter>
            </Card>
        </main>
    );
}
