'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const sizeClasses = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Loading...',
}) => {
  return (
    <Card className="p-8 flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`} />
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </Card>
  );
};
