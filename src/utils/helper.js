export function capitalizeSentence(sentence) {
  // Split the sentence into words
  const words = sentence.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the capitalized words back into a sentence
  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}
