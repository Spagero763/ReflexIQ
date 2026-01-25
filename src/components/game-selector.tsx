'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  difficulty: string;
}

interface GameSelectorProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
  selectedGame?: string;
}

export const GameSelector: React.FC<GameSelectorProps> = ({
  games,
  onSelectGame,
  selectedGame,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select a Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card
            key={game.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedGame === game.id ? 'border-2 border-blue-600' : ''
            }`}
            onClick={() => onSelectGame(game.id)}
          >
            <div className="text-4xl mb-4">{game.icon}</div>
            <h3 className="text-lg font-bold mb-2">{game.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{game.description}</p>
            <div className="flex gap-2 justify-between text-xs">
              <span className="px-2 py-1 bg-gray-100 rounded">{game.category}</span>
              <span className="px-2 py-1 bg-blue-100 rounded text-blue-700">
                {game.difficulty}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
