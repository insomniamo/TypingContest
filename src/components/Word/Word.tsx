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
};

const Word: React.FC<WordProps> = ({ wordObj, currentLetterIndex }) => {
  return (
    <div className={`word ${wordObj.isActive ? "active" : ""}`}>
      {wordObj.word.map((charObj, index) => (
        <Letter key={index} letter={charObj.letter} isCorrect={charObj.isCorrect} isActive={index === currentLetterIndex} />
      ))}
    </div>
  );
};

export default Word;
