'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DifficultyOption {
  level: 'easy' | 'medium' | 'hard' | 'expert';
  label: string;
  description: string;
}

interface DifficultySelectorProps {
  options: DifficultyOption[];
  selected: DifficultyOption['level'];
  onChange: (level: DifficultyOption['level']) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  options,
  selected,
  onChange,
}) => {
  const colors = {
    easy: 'border-green-500 bg-green-50',
    medium: 'border-yellow-500 bg-yellow-50',
    hard: 'border-orange-500 bg-orange-50',
    expert: 'border-red-500 bg-red-50',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <Button
          key={option.level}
          onClick={() => onChange(option.level)}
          variant={selected === option.level ? 'default' : 'outline'}
          className={`p-6 h-auto flex flex-col items-start gap-2 ${
            selected === option.level ? colors[option.level] : ''
          }`}
        >
          <div className="font-semibold">{option.label}</div>
          <div className="text-sm text-gray-600">{option.description}</div>
        </Button>
      ))}
    </div>
  );
};
