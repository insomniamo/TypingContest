import React from "react";
import Letter from "@components/Letter/Letter";
import "./word.scss";

type LetterType = {
  letter: string;
  isCorrect: boolean | null;
  isExtra?: boolean;
};

type WordProps = {
  wordObj: {
    word: LetterType[];
    isActive: boolean;
  };
  currentLetterIndex: number;
  isError: boolean;
};

const LETTER_WIDTH = 19.21;

const Word: React.FC<WordProps> = ({ wordObj, currentLetterIndex, isError }) => {
  return (
    <div className={`word ${wordObj.isActive ? "active" : ""} ${isError ? "word__error" : ""}`}>
      {wordObj.isActive && (
        <span
          className="word__caret"
          style={{ left: `${currentLetterIndex * LETTER_WIDTH - 1.5}px` }}
        />
      )}
      {wordObj.word.map((charObj, index) => (
        <Letter
          key={index}
          letter={charObj.letter}
          isCorrect={charObj.isCorrect}
          isExtra={charObj.isExtra}
        />
      ))}
    </div>
  );
};

export default Word;
