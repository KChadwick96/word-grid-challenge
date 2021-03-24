const fs = require("fs");

const loadDictionary = () => {
  const file = fs.readFileSync("./dictionary.txt", { encoding: "utf8" });
  const words = file.split("\n");

  return words;
};

const wordExistsWithinStr = (word, str) => {
  let wordLetters = [...word].sort();
  let availableLetters = [...str];

  const validWord = wordLetters.every((letter) => {
    const index = availableLetters.findIndex((l) => l === letter);
    if (index > -1) {
      availableLetters.splice(index, 1);
      return true;
    }

    return false;
  });

  return validWord;
};

const recursiveGenerateGrid = (grid, letters, words) => {
  const currentGridIndex = grid.findIndex((word) => word === undefined);

  const isLastWord = currentGridIndex === grid.length - 1;

  const nextPotentialWords = words.filter((potentialWord) => {
    let startOfNextWord = "";
    grid.forEach((gridWord) => {
      if (gridWord === undefined) return;

      startOfNextWord += gridWord[currentGridIndex];
    });

    return (
      potentialWord.startsWith(startOfNextWord) &&
      wordExistsWithinStr(potentialWord, letters.join())
    );
  });

  nextPotentialWords.forEach((word) => {
    let currentGrid = [...grid];
    let availableLetters = [...letters];
    currentGrid[currentGridIndex] = word;
    [...word].forEach((letter) => {
      const letterIndex = availableLetters.findIndex((l) => l === letter);
      availableLetters.splice(letterIndex, 1);
    });

    if (!isLastWord) {
      return recursiveGenerateGrid(currentGrid, availableLetters, words);
    }

    potentialGrids.push(currentGrid);
  });
};

let potentialGrids;
const generateWordGrid = (input) => {
  potentialGrids = [];
  const [n, gridLetters] = input.split(" ");
  const dictionary = loadDictionary();

  const wordLength = Number(n);
  const potentialWords = dictionary.filter((word) => {
    if (word.length !== wordLength) return false;

    let isPotentialWord = true;
    [...word].forEach((letter) => {
      if (!gridLetters.includes(letter)) isPotentialWord = false;
    });

    if (!isPotentialWord) return false;

    return wordExistsWithinStr(word, gridLetters);
  });

  recursiveGenerateGrid(
    new Array(wordLength),
    [...gridLetters],
    potentialWords
  );

  // console.log(`POTENTIAL GRIDS - ${gridLetters}`);
  // potentialGrids.forEach((grid) => console.table(grid));

  return potentialGrids;
};

module.exports = { generateWordGrid, wordExistsWithinStr };
