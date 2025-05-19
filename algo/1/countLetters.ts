function countLetters(givenString: string, letter: string): number {
  return givenString.split("").filter((char) => char === letter).length;
}

export default countLetters;
