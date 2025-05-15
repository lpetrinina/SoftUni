function convertArray(words: string[]): [string, number] {
  const text = words.join("");

  return [text, text.length];
}

console.log(convertArray(["How", "are", "you?"]));
console.log(
  convertArray(["Today", " is", " a ", "nice", " ", "day for ", "TypeScript"])
);
