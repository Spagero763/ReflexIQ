'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface TimerDisplayProps {
  duration: number;
  isActive: boolean;
  onComplete?: () => void;
  format?: 'mm:ss' | 'seconds';
  showWarning?: boolean;
  warningThreshold?: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  duration,
  isActive,
  onComplete,
  format = 'mm:ss',
  showWarning = true,
  warningThreshold = 10,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const isWarning = showWarning && timeLeft <= warningThreshold;

  const displayTime =
    format === 'mm:ss'
      ? `${Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
      : timeLeft.toString();

  return (
    <Card
      className={`p-4 text-center ${
        isWarning ? 'bg-red-50 border-red-300' : ''
      }`}
    >
      <div className={`text-3xl font-bold ${isWarning ? 'text-red-600' : ''}`}>
        {displayTime}
      </div>
      <div className="text-sm text-gray-600 mt-1">Time Remaining</div>
    </Card>
  );
};
