'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  level: number;
  accuracy: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  currentUserId,
}) => {
  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Accuracy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.rank}
              className={currentUserId === entry.playerName ? 'bg-blue-50' : ''}
            >
              <TableCell className="font-medium">#{entry.rank}</TableCell>
              <TableCell>{entry.playerName}</TableCell>
              <TableCell>{entry.score}</TableCell>
              <TableCell>{entry.level}</TableCell>
              <TableCell>{entry.accuracy}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
