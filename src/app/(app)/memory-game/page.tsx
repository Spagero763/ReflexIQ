"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Brain, RefreshCw } from 'lucide-react';

const icons = [
  'Anchor', 'Bike', 'Bomb', 'Car', 'Diamond', 'FlaskConical', 'Heart', 'Plane'
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function MemoryGamePage() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const gameCards = shuffleArray([...icons, ...icons]);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatched([...matched, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const isGameWon = matched.length === cards.length && cards.length > 0;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Memory Game</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-xl font-bold text-primary">
                    <Brain />
                    <span>Moves: {Math.floor(moves / 2)}</span>
                </div>
                <Button onClick={initializeGame} variant="outline">
                    <RefreshCw className="mr-2" />
                    Reset Game
                </Button>
            </div>

            {isGameWon ? (
                <div className="text-center py-10">
                    <h2 className="text-3xl font-bold text-green-500 mb-4">You Win!</h2>
                    <p className="text-lg text-muted-foreground">You completed the game in {Math.floor(moves / 2)} moves.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {cards.map((icon, index) => {
                        const isFlipped = flipped.includes(index) || matched.includes(index);
                        return (
                            <Card 
                                key={index} 
                                onClick={() => handleCardClick(index)}
                                className={`aspect-square flex items-center justify-center cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                                   <LayoutGrid className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <div className="absolute w-full h-full flex items-center justify-center rotate-y-180 backface-hidden bg-primary rounded-lg">
                                    <span className="text-4xl text-primary-foreground">{icon.charAt(0)}</span>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </Card>
      </div>
        <style jsx>{`
            .transform-style-3d {
                transform-style: preserve-3d;
            }
            .rotate-y-180 {
                transform: rotateY(180deg);
            }
            .backface-hidden {
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }
        `}</style>
    </main>
  );
}
