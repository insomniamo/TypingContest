import React from "react";
import Letter from "@components/Letter/Letter";
import "./word.scss";

type LetterType = {
  letter: string;
  isCorrect: boolean | null;
};

type WordProps = {
  wordObj: {
    word: LetterType[];
    isActive: boolean;
  };
  currentLetterIndex: number;
  isError: boolean;
};

const Word: React.FC<WordProps> = ({ wordObj, currentLetterIndex, isError }) => {
  return (
    <div className={`word ${wordObj.isActive ? "active" : ""} ${isError ? "word__error" : ""}`}>
      {wordObj.word.map((charObj, index) => (
        <Letter key={index} letter={charObj.letter} isCorrect={charObj.isCorrect} isActive={index === currentLetterIndex} />
      ))}
    </div>
  );
};

export default Word;
