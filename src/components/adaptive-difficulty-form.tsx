"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAdjustedDifficulty } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdjustDifficultyOutput } from "@/ai/flows/adaptive-difficulty";

const formSchema = z.object({
  performanceScore: z.coerce.number().min(0, "Score must be positive").max(100, "Score cannot exceed 100"),
  currentDifficulty: z.enum(["Easy", "Medium", "Hard"]),
});

export function AdaptiveDifficultyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdjustDifficultyOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performanceScore: 75,
      currentDifficulty: "Medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await getAdjustedDifficulty({
        userPerformance: values.performanceScore,
        currentDifficulty: values.currentDifficulty,
      });
      setResult(res);
    } catch (error) {
      console.error("Failed to adjust difficulty", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="performanceScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Performance Score (0-100)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 85" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentDifficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? "Adjusting..." : "Adjust Difficulty"}
            <Zap className="ml-2 h-4 w-4"/>
          </Button>
        </form>
      </Form>

      {isLoading && (
         <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5"/> AI is Thinking...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-full" />
             <Skeleton className="h-6 w-3/4" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-secondary border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-5 w-5"/> New Difficulty Assigned
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-bold">{result.newDifficulty}</p>
            <p className="text-sm text-muted-foreground">{result.reason}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
