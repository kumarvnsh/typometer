
const phrases = [
  "The quick brown fox jumps over the lazy dog while the moon shines brightly in the clear night sky, creating shadows across the landscape.",
  "A journey of a thousand miles begins with a single step, so take that first step with confidence and determination towards achieving your dreams.",
  "Innovation distinguishes between a leader and a follower, which is why great leaders are always looking for new ways to solve old problems.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall and learning from our mistakes.",
  "Time is the most valuable thing a person can spend, so invest it wisely in activities that bring joy and meaning to your life.",
  "Knowledge is power, and with great power comes great responsibility to use that knowledge to help others and improve the world.",
  "Success is not final, failure is not fatal, it is the courage to continue that counts when facing life's challenges.",
  "Happiness is not something ready made, it comes from your own actions and the way you choose to perceive the world around you.",
  "The future belongs to those who believe in the beauty of their dreams and work tirelessly to make those dreams a reality.",
  "Life is what happens when you're busy making other plans, so remember to enjoy the journey and not just focus on the destination.",
  "The only limit to our realization of tomorrow is our doubts of today, so believe in yourself and your abilities to succeed.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends when we needed them most.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today through learning and growth.",
  "The best way to predict the future is to create it yourself through hard work, dedication, and a clear vision of what you want.",
  "Every accomplishment starts with the decision to try, so never be afraid to attempt something new and challenging in your life."
];

export const getRandomPhrase = (): string => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

export default phrases;
