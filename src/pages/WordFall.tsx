import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface FallingWord {
  id: number;
  text: string;
  position: number;
  speed: number;
  xPosition: number;
}

const WORDS = {
  easy: ["cat", "dog", "run", "jump", "play", "eat", "sleep", "walk", "talk", "read"],
  medium: ["computer", "keyboard", "monitor", "program", "network", "system", "database", "server", "client", "device"],
  hard: ["algorithm", "framework", "interface", "component", "function", "variable", "parameter", "developer", "software", "hardware"]
};

export default function WordFall() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'landing' | 'playing' | 'gameOver'>('landing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [input, setInput] = useState('');
  const [currentWord, setCurrentWord] = useState<FallingWord | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isWordResolved, setIsWordResolved] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Spawn a new word
  const spawnNewWord = () => {
    const wordPool = level <= 2 ? WORDS.easy : level <= 4 ? WORDS.medium : WORDS.hard;
    const newWord: FallingWord = {
      id: Date.now(),
      text: wordPool[Math.floor(Math.random() * wordPool.length)],
      position: 0,
      speed: 1 + (level * 0.2),
      xPosition: Math.random() * 80 + 10 // Random horizontal position between 10% and 90%
    };
    setCurrentWord(newWord);
    setInput('');
    setFeedback('');
    setIsWordResolved(false);
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing' || !currentWord || isWordResolved) return;

    const gameLoop = setInterval(() => {
      setCurrentWord(prev => {
        if (!prev) return null;
        const newPosition = prev.position + prev.speed;
        
        // Check if word reached bottom
        if (newPosition >= 90) {
          setIsWordResolved(true);
          setLives(prev => Math.max(0, prev - 1));
          toast.error("Missed!");
          // Spawn new word after a short delay
          setTimeout(spawnNewWord, 1000);
          return null;
        }
        
        return {
          ...prev,
          position: newPosition
        };
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, currentWord, isWordResolved]);

  // Handle word submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || !input.trim() || isWordResolved) return;

    if (input.toLowerCase() === currentWord.text.toLowerCase()) {
      setIsWordResolved(true);
      setScore(prev => prev + 10);
      toast.success("Correct!");
      // Spawn new word after a short delay
      setTimeout(spawnNewWord, 1000);
    } else {
      toast.error("Incorrect! Try again.");
      setFeedback("Incorrect! Try again.");
    }
  };

  // Spawn first word when game starts
  useEffect(() => {
    if (gameState === 'playing' && !currentWord) {
      spawnNewWord();
    }
  }, [gameState, currentWord]);

  // Check for game over
  useEffect(() => {
    if (lives <= 0) {
      setGameState('gameOver');
    }
  }, [lives]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    setCurrentWord(null);
    setInput('');
    setFeedback('');
    setIsWordResolved(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Home Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50"
        onClick={() => navigate('/')}
      >
        <Home className="h-6 w-6" />
      </Button>

      {/* Game Area */}
      <div className="container mx-auto px-4 py-8">
        {gameState === 'landing' && (
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Word Fall Challenge</h1>
            <p className="text-lg mb-8">
              Test your typing speed in this exciting word-catching game! Type the falling words before they reach the bottom.
              Each correct word gives you points, but miss too many and it's game over!
            </p>
            <Button size="lg" onClick={startGame}>
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          </Card>
        )}

        {gameState === 'playing' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex justify-between items-center">
              <div className="text-xl">Score: {score}</div>
              <div className="text-xl">Lives: {lives}</div>
              <div className="text-xl">Level: {level}</div>
            </div>

            {/* Game Area */}
            <div
              ref={gameAreaRef}
              className="relative h-[60vh] bg-muted/20 rounded-lg overflow-hidden"
            >
              {currentWord && (
                <div
                  className="absolute text-xl font-mono"
                  style={{
                    left: `${currentWord.xPosition}%`,
                    top: `${currentWord.position}%`,
                    transition: 'top 0.05s linear'
                  }}
                >
                  {currentWord.text}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 text-xl text-center bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type the falling word and press Enter..."
                autoFocus
                disabled={isWordResolved}
              />
              {feedback && (
                <p className="text-destructive text-center">{feedback}</p>
              )}
            </form>
          </div>
        )}

        {gameState === 'gameOver' && (
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <Button size="lg" onClick={startGame}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
} 