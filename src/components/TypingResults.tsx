
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypingStats, formatTime } from "@/utils/typingUtils";
import { Clock, RefreshCw, Trophy, Keyboard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypingResultsProps {
  stats: TypingStats;
  onRestart: () => void;
}

const TypingResults = ({ stats, onRestart }: TypingResultsProps) => {
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
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="stat-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold tracking-tighter mb-1 gradient-text">{stats.wpm}</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">WPM</div>
            </div>
            <div className="stat-card animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl md:text-4xl font-bold tracking-tighter mb-1 gradient-text">{stats.accuracy}%</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">Accuracy</div>
            </div>
          </div>
          
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between p-2 md:p-3 bg-secondary/30 rounded-lg">
              <span className="text-xs md:text-sm font-medium flex items-center">
                <Clock size={isMobile ? 14 : 16} className="mr-2 text-primary" />
                Time
              </span>
              <span className="font-medium text-sm md:text-base">
                {formatTime(stats.timeElapsed)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 md:p-3 bg-secondary/30 rounded-lg">
              <span className="text-xs md:text-sm font-medium flex items-center">
                <Keyboard size={isMobile ? 14 : 16} className="mr-2 text-primary" />
                Characters
              </span>
              <span className="font-medium text-sm md:text-base">
                <span className="text-primary">{stats.correctChars}</span>
                <span className="mx-1 text-muted-foreground">/</span>
                <span className="text-destructive">{stats.incorrectChars}</span>
                <span className="mx-1 text-muted-foreground">/</span>
                <span>{stats.totalChars}</span>
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full flex items-center gap-2 transition-all bg-primary hover:bg-primary/90 animate-pulse-light"
            onClick={onRestart}
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
