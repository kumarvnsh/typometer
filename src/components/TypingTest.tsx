import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRandomPhrase } from "@/utils/phrases";
import { TypingStats, calculateWPM, calculateAccuracy, formatTime } from "@/utils/typingUtils";
import TypingResults from "./TypingResults";
import { Clock, ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

const TypingTest = () => {
  const [phrase, setPhrase] = useState("");
  const [input, setInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeElapsed: 0
  });
  
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  
  // Generate a random phrase on mount or restart
  useEffect(() => {
    const newPhrase = getRandomPhrase();
    setPhrase(newPhrase);
    setInput("");
    setIsStarted(false);
    setIsFinished(false);
    setElapsedTime(0);
    setProgress(0);
    
    // Clear any existing timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  // Timer logic
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = window.setInterval(() => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTime) / 1000;
        setElapsedTime(elapsed);
      }, 100);
    }
    
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isFinished, startTime]);
  
  // Focus input on start
  useEffect(() => {
    if (isStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStarted]);
  
  // Update progress bar
  useEffect(() => {
    if (phrase.length > 0) {
      setProgress((input.length / phrase.length) * 100);
    }
  }, [input, phrase]);
  
  // Check if test is complete
  useEffect(() => {
    if (isStarted && input.length >= phrase.length) {
      completeTest();
    }
  }, [input, phrase, isStarted]);
  
  // Start the test
  const startTest = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Process the typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted) {
      startTest();
    }
    
    if (!isFinished) {
      setInput(e.target.value);
    }
  };
  
  // Calculate and set final stats
  const completeTest = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    
    let correctChars = 0;
    let incorrectChars = 0;
    
    for (let i = 0; i < input.length; i++) {
      if (i < phrase.length && input[i] === phrase[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }
    
    const finalTime = elapsedTime;
    const wpm = calculateWPM(correctChars, finalTime);
    const accuracy = calculateAccuracy(correctChars, correctChars + incorrectChars);
    
    setStats({
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars: phrase.length,
      timeElapsed: finalTime
    });
    
    setIsFinished(true);
  }, [input, phrase, elapsedTime]);
  
  // Restart the test
  const restartTest = () => {
    const newPhrase = getRandomPhrase();
    setPhrase(newPhrase);
    setInput("");
    setIsStarted(false);
    setIsFinished(false);
    setElapsedTime(0);
    setProgress(0);
  };
  
  // Render the current typing phrase with highlighted characters
  const renderPhrase = () => {
    return phrase.split("").map((char, index) => {
      let className = "";
      
      if (index < input.length) {
        className = input[index] === char ? "correct-char" : "incorrect-char";
      } else if (index === input.length) {
        className = "current-char";
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };
  
  if (isFinished) {
    return <TypingResults stats={stats} onRestart={restartTest} />;
  }
  
  return (
    <div className="animate-fade-in">
      <div className="typing-area transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium bg-secondary/80 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm animate-pulse-light">
            {isStarted ? (
              <span className="flex items-center gap-2">
                <Clock size={isMobile ? 14 : 16} className="text-primary" />
                {formatTime(elapsedTime)}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={isMobile ? 14 : 16} className="text-primary" />
                Ready to start
              </span>
            )}
          </div>
          {isStarted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={restartTest}
              className="text-sm flex items-center gap-1.5 animate-slide-up"
            >
              <RefreshCw size={14} />
              Restart
            </Button>
          )}
        </div>
        
        <div className="mb-6 animate-scale-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary/50" />
        </div>
        
        <div className={`phrase-display transition-all duration-300 text-base md:text-xl ${isStarted ? 'animate-slide-up' : ''}`}>
          {renderPhrase()}
        </div>
        
        {!isStarted ? (
          <Button
            onClick={startTest}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 animate-pulse-light"
          >
            Start Typing <ArrowRight size={16} />
          </Button>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full h-10 md:h-12 px-4 bg-secondary/50 rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all mono text-base md:text-lg shadow-sm animate-slide-up"
            placeholder="Start typing..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        )}
      </div>
    </div>
  );
};

export default TypingTest;
