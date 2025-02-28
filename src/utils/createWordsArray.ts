export type Letter = {
  letter: string;
  isCorrect: boolean | null;
  isExtra: boolean;
};

export type Word = {
  word: Letter[];
  isActive: boolean;
};

export const createWordsArray = (referenceText: string, punctuation: boolean, uppercase: boolean, mode: string, wordsAmount: number): Word[] => {
  let cleanedText = referenceText.replace(/—/g, "-").trim();

  if (!punctuation) {
    cleanedText = cleanedText.replace(/[.,!?;:(){}\[\]<>«»“”'"-]+/g, "");
  }
  if (!uppercase) {
    cleanedText = cleanedText.toLowerCase();
  }

  let words = cleanedText.split(/\s+/);

  if (mode === "words") {
    words = words.sort(() => Math.random() - 0.5).slice(0, wordsAmount);
  } else if (mode === "time"){
    words = words.sort(() => Math.random() - 0.5);
  }

  return words.map((word, index) => ({
    word: word.split("").map((letter) => ({
      letter,
      isCorrect: null,
      isExtra: false,
    })),
    isActive: index === 0,
  }));
};

