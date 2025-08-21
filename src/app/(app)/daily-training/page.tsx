import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { AdaptiveDifficultyForm } from "@/components/adaptive-difficulty-form";

export default function DailyTrainingPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Daily Training</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Today's Quick Challenge</CardTitle>
            <CardDescription>A quick question to get your brain warmed up!</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-lg font-semibold text-secondary-foreground">
                I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?
              </p>
            </div>
          </CardContent>
          <CardContent>
            <Button className="w-full bg-primary hover:bg-primary/90">Reveal Answer</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent" />
              <CardTitle>AI Difficulty Adjustment</CardTitle>
            </div>
            <CardDescription>
              Our AI adapts the game's difficulty based on your performance to keep you engaged. 
              See how it works below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdaptiveDifficultyForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
