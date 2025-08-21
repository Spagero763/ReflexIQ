
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Loader, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateTrivia, type GenerateTriviaOutput } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

const TIME_LIMIT = 15; // seconds
const CATEGORIES = ["Science", "History", "Movies", "Geography", "Technology"];

export default function TriviaPage() {
  const [currentQuestion, setCurrentQuestion] = useState<GenerateTriviaOutput | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(TIME_LIMIT);
    
    try {
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const question = await generateTrivia({ category, difficulty: "Medium" });
      setCurrentQuestion(question);
    } catch (e) {
      setError("Failed to load a new question. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewQuestion();
  }, [fetchNewQuestion]);

  useEffect(() => {
    if (selectedOption === null && !loading && !error) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleOptionClick(null); // Timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedOption, loading, error]);

  const handleOptionClick = (option: string | null) => {
    if (selectedOption || !currentQuestion) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      fetchNewQuestion();
    }, 2000);
  };

  const getButtonClass = (option: string) => {
    if (!currentQuestion || selectedOption === null) {
      return "bg-background hover:bg-secondary";
    }
    if (option === currentQuestion.answer) {
      return "bg-green-200 text-green-800 border-green-400 hover:bg-green-300";
    }
    if (option === selectedOption && !isCorrect) {
      return "bg-red-200 text-red-800 border-red-400 hover:bg-red-300";
    }
    return "bg-background opacity-50 cursor-not-allowed";
  };
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Trivia Challenge</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Card className="w-full max-w-2xl transform transition-all duration-300 ease-in-out">
          {loading ? (
             <CardContent className="p-6 space-y-4">
               <Skeleton className="h-8 w-1/3" />
               <Skeleton className="h-6 w-full" />
               <Skeleton className="h-4 w-full" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-16 w-full" />
               </div>
             </CardContent>
          ) : error || !currentQuestion ? (
              <CardContent className="p-6 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <p className="mt-4 text-lg text-destructive">{error || "Something went wrong."}</p>
                 <Button onClick={fetchNewQuestion} className="mt-4">Try Again</Button>
              </CardContent>
          ) : (
            <>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-primary">{currentQuestion.category}</CardTitle>
                  <div className="text-lg font-semibold">Score: {score}</div>
                </div>
                <p className="text-muted-foreground pt-2">{currentQuestion.question}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={(timeLeft / TIME_LIMIT) * 100} className="h-2 transition-all duration-1000 ease-linear" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className={cn("h-16 text-lg justify-start p-4 transition-all duration-300", getButtonClass(option))}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                    >
                      {selectedOption !== null && option === currentQuestion.answer && <CheckCircle className="mr-2 h-5 w-5" />}
                      {selectedOption === option && !isCorrect && <XCircle className="mr-2 h-5 w-5" />}
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <p>Time left: {timeLeft}s</p>
                <Button variant="ghost" size="sm" disabled>
                  <Lightbulb className="mr-2 h-4 w-4" /> Hint
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
