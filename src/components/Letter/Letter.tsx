import React from "react";
import "./letter.scss";

type LetterProps = {
  letter: string;
  isCorrect: boolean | null;
};

const Letter: React.FC<LetterProps> = ({ letter, isCorrect }) => {
  return (
    <span
      className={`letter ${
        isCorrect === null ? "" : isCorrect ? "letter__correct" : "letter__incorrect"
      }`}
    >
      {letter}
    </span>
  );
};

export default Letter;
