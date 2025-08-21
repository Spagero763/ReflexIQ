"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { date: "Day 1", trivia: 6, puzzles: 4 },
  { date: "Day 2", trivia: 8, puzzles: 5 },
  { date: "Day 3", trivia: 7, puzzles: 7 },
  { date: "Day 4", trivia: 9, puzzles: 6 },
  { date: "Day 5", trivia: 10, puzzles: 8 },
  { date: "Day 6", trivia: 9, puzzles: 9 },
  { date: "Day 7", trivia: 12, puzzles: 10 },
];

const highScores = [
  { rank: 1, player: "Alice", score: 15400, category: "Trivia" },
  { rank: 2, player: "Bob", score: 14200, category: "Trivia" },
  { rank: 3, player: "Charlie", score: 13800, category: "Puzzles" },
  { rank: 4, player: "Diana", score: 12500, category: "Trivia" },
  { rank: 5, player: "Eve", score: 11900, category: "Puzzles" },
];

export default function ProgressPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Progress Tracker</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Correct answers per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar dataKey="trivia" fill="hsl(var(--chart-1))" name="Trivia" radius={[4, 4, 0, 0]} />
                <Bar dataKey="puzzles" fill="hsl(var(--chart-2))" name="Puzzles" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Score</CardTitle>
                    <CardDescription>Your all-time high score.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">12,500</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Best Category</CardTitle>
                    <CardDescription>The category you excel in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-accent">Science</p>
                </CardContent>
            </Card>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>High Scores</CardTitle>
          <CardDescription>Top players on the leaderboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highScores.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell className="font-medium">{entry.rank}</TableCell>
                  <TableCell>{entry.player}</TableCell>
                   <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${entry.category === 'Trivia' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {entry.category}
                    </span>
                   </TableCell>
                  <TableCell className="text-right">{entry.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
