import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypingStats, formatTime } from "@/utils/typingUtils";
import { Clock, RefreshCw, Trophy, Keyboard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypingResultsProps {
  results: {
    wpm: number;
    accuracy: number;
    time: number;
  };
}

const TypingResults = ({ results }: TypingResultsProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`transition-all duration-500 ease-out transform ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <Card className="result-card bg-card/90 backdrop-blur-sm w-full max-w-sm mx-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-center mb-2 animate-bounce" style={{ animationDuration: '2s' }}>
            <Trophy size={isMobile ? 24 : 28} className="text-primary mr-2" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-center gradient-text animate-fade-in">
            Test Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold">{results.wpm.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold">{results.accuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold">{results.time.toFixed(1)}s</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full flex items-center gap-2 transition-all bg-primary hover:bg-primary/90 animate-pulse-light"
          >
            <RefreshCw size={isMobile ? 14 : 16} />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TypingResults;
