interface HighScore {
  wpm: number;
  accuracy: number;
  date: string;
  time: number;
}

const STORAGE_KEY = 'typometer_high_scores';
const MAX_SCORES = 10;

export const getHighScores = (): HighScore[] => {
  const scores = localStorage.getItem(STORAGE_KEY);
  return scores ? JSON.parse(scores) : [];
};

export const addHighScore = (score: Omit<HighScore, 'date'>): void => {
  const scores = getHighScores();
  const newScore: HighScore = {
    ...score,
    date: new Date().toLocaleDateString(),
  };

  scores.push(newScore);
  scores.sort((a, b) => b.wpm - a.wpm); // Sort by WPM in descending order
  scores.splice(MAX_SCORES); // Keep only top 10 scores

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};

export const clearHighScores = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isHighScore = (wpm: number): boolean => {
  const scores = getHighScores();
  return scores.length < MAX_SCORES || wpm > (scores[scores.length - 1]?.wpm ?? 0);
}; 