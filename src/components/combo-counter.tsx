'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ComboCounterProps {
  count: number;
  maxCombo?: number;
  showAnimation?: boolean;
  color?: 'orange' | 'purple' | 'blue' | 'green';
}

const colorClasses = {
  orange: 'text-orange-600',
  purple: 'text-purple-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
};

export const ComboCounter: React.FC<ComboCounterProps> = ({
  count,
  maxCombo,
  showAnimation = true,
  color = 'orange',
}) => {
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    if (showAnimation && count > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count, showAnimation]);

  return (
    <Card className={`p-4 text-center ${animate ? 'scale-110' : ''} transition-transform`}>
      <div className={`text-4xl font-bold ${colorClasses[color]}`}>
        {count}
      </div>
      <div className="text-sm text-gray-600">
        {count === 1 ? 'Combo' : 'Combo'}
      </div>
      {maxCombo && (
        <div className="text-xs text-gray-500 mt-2">
          Max: {maxCombo}
        </div>
      )}
    </Card>
  );
};
