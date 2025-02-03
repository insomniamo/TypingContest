import React from "react";
import "./letter.scss";

type LetterProps = {
  letter: string;
  isCorrect: boolean | null;
  isActive: boolean;
};

const Letter: React.FC<LetterProps> = ({ letter, isCorrect, isActive }) => {
  return (
    <span
      className={`letter ${
        isCorrect === null ? "" : isCorrect ? "letter__correct" : "letter__incorrect"
      }`}
    >
      {letter}
      {isActive && <span className="letter__caret"></span>}
    </span>
  );
};

export default Letter;
