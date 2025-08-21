"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    category: "Geography"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    category: "Science"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: "Harper Lee",
    category: "Literature"
  }
];

const TIME_LIMIT = 15; // seconds

export default function TriviaPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  useEffect(() => {
    if (selectedOption === null) {
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
  }, [currentQuestionIndex, selectedOption]);

  const handleOptionClick = (option: string | null) => {
    if (selectedOption) return; // Prevent multiple selections

    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      setTimeLeft(TIME_LIMIT);
      setCurrentQuestionIndex(prev => (prev + 1) % triviaQuestions.length);
    }, 2000);
  };

  const getButtonClass = (option: string) => {
    if (selectedOption === null) {
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
            <Button variant="ghost" size="sm">
              <Lightbulb className="mr-2 h-4 w-4" /> Hint
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
