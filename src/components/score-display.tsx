'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ScoreDisplayProps {
  current: number;
  maximum?: number;
  previousScore?: number;
  showDifference?: boolean;
  showMultiplier?: boolean;
  multiplier?: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  current,
  maximum,
  previousScore,
  showDifference = false,
  showMultiplier = false,
  multiplier = 1,
}) => {
  const difference = previousScore ? current - previousScore : 0;
  const isIncrease = difference >= 0;

  return (
    <Card className="p-6 text-center">
      <div className="text-sm text-gray-600 mb-2">Current Score</div>
      <div className="text-5xl font-bold text-blue-600 mb-4">{current}</div>
      {maximum && (
        <div className="text-sm text-gray-600 mb-4">
          Maximum: {maximum}
        </div>
      )}
      {showDifference && previousScore !== undefined && (
        <div
          className={`text-sm font-semibold ${
            isIncrease ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isIncrease ? '+' : ''}{difference}
        </div>
      )}
      {showMultiplier && multiplier > 1 && (
        <div className="text-sm text-orange-600 font-semibold mt-4">
          {multiplier}x Multiplier
        </div>
      )}
    </Card>
  );
};
