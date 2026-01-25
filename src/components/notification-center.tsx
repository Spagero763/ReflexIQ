'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
}

const typeIcons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

const typeBgColors = {
  info: 'bg-blue-50 border-blue-300',
  success: 'bg-green-50 border-green-300',
  warning: 'bg-yellow-50 border-yellow-300',
  error: 'bg-red-50 border-red-300',
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-h-96 overflow-y-auto space-y-2">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 border-l-4 ${typeBgColors[notification.type]} cursor-pointer transition-all hover:shadow-lg`}
          onClick={() => onDismiss(notification.id)}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">{typeIcons[notification.type]}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
