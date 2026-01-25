'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  isLocked?: boolean;
}

const rarityColors = {
  common: 'bg-gray-100 border-gray-300',
  uncommon: 'bg-green-100 border-green-300',
  rare: 'bg-blue-100 border-blue-300',
  epic: 'bg-purple-100 border-purple-300',
  legendary: 'bg-yellow-100 border-yellow-300',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  description,
  icon,
  rarity,
  unlockedAt,
  isLocked = false,
}) => {
  return (
    <Card className={`p-4 border-2 ${rarityColors[rarity]} ${isLocked ? 'opacity-50' : ''}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-sm">{name}</h3>
      <p className="text-xs text-gray-600">{description}</p>
      {unlockedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Unlocked: {unlockedAt.toLocaleDateString()}
        </p>
      )}
    </Card>
  );
};
