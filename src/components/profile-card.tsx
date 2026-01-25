'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ProfileCardProps {
  userName: string;
  userAvatar?: string;
  level: number;
  totalScore: number;
  gamesPlayed: number;
  favoriteGame?: string;
  joinDate: Date;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userName,
  userAvatar,
  level,
  totalScore,
  gamesPlayed,
  favoriteGame,
  joinDate,
}) => {
  return (
    <Card className="p-6 max-w-sm">
      <div className="text-center">
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="w-20 h-20 rounded-full mx-auto mb-4" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4" />
        )}
        <h2 className="text-2xl font-bold mb-2">{userName}</h2>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-sm text-gray-600">Level</div>
            <div className="text-2xl font-bold text-blue-600">{level}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Score</div>
            <div className="text-2xl font-bold text-green-600">{totalScore}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Games</div>
            <div className="text-2xl font-bold text-purple-600">{gamesPlayed}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Favorite</div>
            <div className="text-sm font-semibold">{favoriteGame || 'N/A'}</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600">
            Joined {joinDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
