// utils/createWordsArray.ts
export type Letter = {
  letter: string;
  isCorrect: boolean | null;
};

export type Word = {
  word: Letter[];
  isActive: boolean;
};

export const createWordsArray = (referenceText: string): Word[] => {
  const cleanedText = referenceText
  .replace(/[.,!?;:(){}[\]<>«»“”'"—-]+/g, "").trim();

  return cleanedText.split(/\s+/).map((word) => ({
    word: word.split("").map((letter) => ({
      letter,
      isCorrect: null,
    })),
    isActive: false,
  }));
};
