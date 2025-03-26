import { useEffect, useState } from 'react';

const words = [
  'Type', 'Speed', 'Fast', 'Quick', 'Accurate', 'Focus', 'Practice', 'Improve',
  'Learn', 'Master', 'Skill', 'Test', 'Challenge', 'Progress', 'Achieve', 'Excel'
];

const FloatingWords = () => {
  const [positions, setPositions] = useState<Array<{ word: string; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newPositions = words.map((word, index) => ({
      word,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setPositions(newPositions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute text-primary/10 text-2xl md:text-3xl font-bold animate-float"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            animationDelay: `${pos.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          {pos.word}
        </div>
      ))}
    </div>
  );
};

export default FloatingWords; 