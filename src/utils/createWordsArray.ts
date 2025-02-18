// utils/createWordsArray.ts
export type Letter = {
  letter: string;
  isCorrect: boolean | null;
};

export type Word = {
  word: Letter[];
  isActive: boolean;
};

export const createWordsArray = (referenceText: string, punctuation: boolean, uppercase: boolean): Word[] => {
  let cleanedText = referenceText.replace(/—/g, "-").trim();

  if (!punctuation) {
    cleanedText = cleanedText.replace(/[.,!?;:(){}\[\]<>«»“”'"-]+/g, "");
  }
  if (!uppercase) {
    cleanedText = cleanedText.toLowerCase();
  }

  return cleanedText.split(/\s+/).map((word) => ({
    word: word.split("").map((letter) => ({
      letter,
      isCorrect: null,
    })),
    isActive: false,
  }));
};
