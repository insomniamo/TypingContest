import React from "react";
import Word from "@components/Word/Word";
import "./words.scss";

type Letter = {
  letter: string;
  isCorrect: boolean | null;
};

type Word = {
  word: Letter[];
  isActive: boolean;
};

type WordsProps = {
  wordsArray: Word[];
};

const Words: React.FC<WordsProps> = ({ wordsArray }) => {
  return (
    <div className="words">
      {wordsArray.map((wordObj, index) => (
        <Word key={index} wordObj={wordObj} />
      ))}
    </div>
  );
};

export default Words;
