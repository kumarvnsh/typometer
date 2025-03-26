import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  loopDelay?: number;
}

const TypewriterText = ({ text, className = '', delay = 100, loopDelay = 30000 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeText = () => {
      let currentIndex = 0;
      // Type forward
      const typeForward = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeForward);
          // Wait for loopDelay before erasing
          setTimeout(() => {
            // Erase text
            const typeBackward = setInterval(() => {
              if (currentIndex > 0) {
                currentIndex--;
                setDisplayText(text.slice(0, currentIndex));
              } else {
                clearInterval(typeBackward);
                // Start the whole process again
                setTimeout(typeText, 500);
              }
            }, delay / 2);
          }, loopDelay);
        }
      }, delay);
    };

    // Start the initial typing
    typeText();

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(cursorInterval);
    };
  }, [text, delay, loopDelay]);

  return (
    <div className={className}>
      <span>{displayText}</span>
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </div>
  );
};

export default TypewriterText; 