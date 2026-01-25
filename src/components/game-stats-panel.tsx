'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface GameStatsPanelProps {
  score: number;
  level: number;
  streak: number;
  accuracy: number;
}

export const GameStatsPanel: React.FC<GameStatsPanelProps> = ({
  score,
  level,
  streak,
  accuracy,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-600">Score</div>
        <div className="text-2xl font-bold">{score}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-600">Level</div>
        <div className="text-2xl font-bold">{level}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-600">Streak</div>
        <div className="text-2xl font-bold">{streak}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-600">Accuracy</div>
        <div className="text-2xl font-bold">{accuracy}%</div>
      </Card>
    </div>
  );
};
