'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PowerUp {
  id: string;
  name: string;
  icon: string;
  description: string;
  duration?: number;
  isActive: boolean;
  count: number;
}

interface PowerUpDisplayProps {
  powerUps: PowerUp[];
  onActivate?: (id: string) => void;
}

export const PowerUpDisplay: React.FC<PowerUpDisplayProps> = ({
  powerUps,
  onActivate,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {powerUps.map((powerUp) => (
        <Card
          key={powerUp.id}
          className={`p-3 text-center cursor-pointer transition-all ${
            powerUp.isActive ? 'border-green-500 bg-green-50' : ''
          } ${powerUp.count === 0 ? 'opacity-50' : ''}`}
        >
          <div className="text-2xl mb-2">{powerUp.icon}</div>
          <div className="text-xs font-semibold mb-1">{powerUp.name}</div>
          <div className="text-xs text-gray-600 mb-2">{powerUp.description}</div>
          <div className="text-lg font-bold text-blue-600 mb-2">{powerUp.count}</div>
          <Button
            size="sm"
            variant={powerUp.isActive ? 'default' : 'outline'}
            disabled={powerUp.count === 0 || powerUp.isActive}
            onClick={() => onActivate?.(powerUp.id)}
            className="w-full"
          >
            {powerUp.isActive ? 'Active' : 'Use'}
          </Button>
        </Card>
      ))}
    </div>
  );
};
