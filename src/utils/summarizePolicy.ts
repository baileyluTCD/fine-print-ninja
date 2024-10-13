const sentenceCount = 1;

export default async function summarizePolicyToTopSentences(
  policy: string
): Promise<string[]> {
  const sentences = policy.match(/[^.!?]+[.!?]+/g) || [];
  const wordFrequency = {};

  // Split text into words and count word frequency
  const words = policy.split(/\W+/);
  words.forEach((word) => {
    const lowerWord = word.toLowerCase();
    wordFrequency[lowerWord] = (wordFrequency[lowerWord] || 0) + 1;
  });

  // Rank sentences based on the sum of word frequencies
  const sentenceScores = sentences.map((sentence) => {
    const sentenceWords = sentence.split(/\W+/);
    const score = sentenceWords.reduce((total, word) => {
      return total + (wordFrequency[word.toLowerCase()] || 0);
    }, 0);
    return { sentence, score };
  });

  // Sort sentences by score and return the top ones
  const topSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, sentenceCount);

  return topSentences.map((sentence) => sentence.sentence);
}
