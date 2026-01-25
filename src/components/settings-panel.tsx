'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface SettingOption {
  key: string;
  label: string;
  type: 'toggle' | 'select' | 'slider';
  value: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
}

interface SettingsPanelProps {
  settings: SettingOption[];
  onSettingChange: (key: string, value: any) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      {settings.map((setting) => (
        <Card key={setting.key} className="p-4">
          <label className="flex items-center justify-between">
            <span className="font-medium">{setting.label}</span>
            {setting.type === 'toggle' && (
              <input
                type="checkbox"
                checked={setting.value}
                onChange={(e) => onSettingChange(setting.key, e.target.checked)}
                className="w-5 h-5"
              />
            )}
            {setting.type === 'select' && (
              <select
                value={setting.value}
                onChange={(e) => onSettingChange(setting.key, e.target.value)}
                className="p-2 border rounded"
              >
                {setting.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {setting.type === 'slider' && (
              <input
                type="range"
                min={setting.min}
                max={setting.max}
                value={setting.value}
                onChange={(e) => onSettingChange(setting.key, parseInt(e.target.value))}
                className="w-32"
              />
            )}
          </label>
        </Card>
      ))}
    </div>
  );
};
