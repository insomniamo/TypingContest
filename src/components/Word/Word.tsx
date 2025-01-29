import React from "react";
import Letter from "@components/Letter/Letter";
import "./word.scss";

type Letter = {
  letter: string;
  isCorrect: boolean | null;
};

type WordProps = {
  wordObj: {
    word: Letter[];
    isActive: boolean;
  };
};

const Word: React.FC<WordProps> = ({ wordObj }) => {
  return (
    <div
      className={`word ${wordObj.isActive ? "active" : ""}`} // Активное слово
    >
      {wordObj.word.map((charObj, index) => (
        <Letter key={index} letter={charObj.letter} isCorrect={charObj.isCorrect} />
      ))}
    </div>
  );
};

export default Word;
