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

export function formatAddressString(addressString) {
  if (typeof addressString !== "string" || addressString.trim() === "") {
    return "Invalid address string";
  }

  // Split the string into words
  const words = addressString.split(",");

  // Capitalize the first letter of each word
  const formattedWords = words.map(
    (word) =>
      word.trim().charAt(0).toUpperCase() + word.trim().slice(1).toLowerCase()
  );

  // Join the words back into a formatted string
  const formattedAddress = formattedWords.join(", ");

  return formattedAddress;
}
