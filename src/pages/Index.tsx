import { useState, useEffect } from "react";
import TypingTest from "@/components/TypingTest";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingWords from "@/components/FloatingWords";
import TypewriterText from "@/components/TypewriterText";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:py-16 relative overflow-hidden">
      <ThemeToggle />
      <FloatingWords />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Light mode blobs */}
        <div className="dark:hidden">
          <div className="absolute top-10 left-10 w-36 md:w-72 h-36 md:h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse-light"></div>
          <div className="absolute bottom-10 right-10 w-40 md:w-80 h-40 md:h-80 bg-accent/20 rounded-full filter blur-3xl animate-pulse-light" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-24 md:w-48 h-24 md:h-48 bg-secondary/30 rounded-full filter blur-3xl animate-pulse-light" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Dark mode aurora effects */}
        <div className="hidden dark:block">
          <div className="bg-blur-blob from-violet-500/10 to-fuchsia-500/10 w-[40rem] h-[40rem] top-[-20%] right-[-10%]"></div>
          <div className="bg-blur-blob from-cyan-500/10 to-blue-500/10 w-[45rem] h-[45rem] bottom-[-20%] left-[-10%]" style={{ animationDelay: '-5s' }}></div>
          <div className="bg-blur-blob from-fuchsia-500/10 to-purple-500/10 w-[35rem] h-[35rem] bottom-[20%] right-[20%]" style={{ animationDelay: '-10s' }}></div>
          
          {/* Stars effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-70"></div>
          
          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl animate-glow" style={{ animationDelay: '-2s' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-16">
        {/* Typing Test Section */}
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center">
            <div className="inline-block bg-secondary/80 backdrop-blur-sm text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-6 md:mb-8 shadow-sm animate-pulse-light">
              Measure your typing prowess
            </div>
            <div className="h-[4rem] md:h-[5rem] flex items-center justify-center mb-6 md:mb-8">
              <TypewriterText 
                text="Typometer"
                className="text-3xl md:text-5xl font-bold tracking-tight gradient-text title-font"
                delay={100}
                loopDelay={30000}
              />
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-lg animate-fade-in mb-12 md:mb-16" style={{ animationDelay: '0.4s' }}>
              Challenge yourself with random phrases and see how quickly you can type with accuracy.
            </p>
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <TypingTest />
          </div>
          
          <div className="text-center text-xs md:text-sm text-muted-foreground animate-fade-in opacity-80" style={{ animationDelay: '0.8s' }}>
            <p>Type the text above as quickly and accurately as you can</p>
          </div>
        </div>

        {/* Word Fall Game Section */}
        <div className="w-full max-w-3xl">
          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Word Fall Challenge</h2>
                <p className="text-lg mb-6">
                  Ready for a new typing challenge? Try our Word Fall game! Catch falling words before they reach the bottom.
                  As you progress, the words get longer and fall faster. Can you beat your high score?
                </p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/wordfall')}
                  className="group"
                >
                  Start Word Fall
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="relative h-48 bg-muted/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-mono animate-bounce">Word Fall</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* About section */}
      <div id="about" className="w-full max-w-3xl mx-auto mt-24 md:mt-32 pb-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">About the Creator</h2>
          <div className="space-y-3">
            <p className="text-lg md:text-xl font-medium">Created by Vnsh Kumar</p>
            <p className="text-muted-foreground">Game Developer</p>
          </div>
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">© 2024 @vnshkumar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
