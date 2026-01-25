'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  color = 'blue',
}) => {
  const percentage = (current / total) * 100;

  return (
    <Card className="p-4">
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-2">
          {current} / {total} ({percentage.toFixed(0)}%)
        </div>
      )}
    </Card>
  );
};
