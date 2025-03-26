
export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
}

export const calculateWPM = (
  correctChars: number,
  timeElapsedInSeconds: number
): number => {
  // Standard formula: (characters / 5) / time in minutes
  // 5 characters is considered one word
  if (timeElapsedInSeconds === 0) return 0;
  
  const minutes = timeElapsedInSeconds / 60;
  const words = correctChars / 5;
  
  return Math.round(words / minutes);
};

export const calculateAccuracy = (
  correctChars: number,
  totalTypedChars: number
): number => {
  if (totalTypedChars === 0) return 100;
  
  return Math.round((correctChars / totalTypedChars) * 100);
};

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
