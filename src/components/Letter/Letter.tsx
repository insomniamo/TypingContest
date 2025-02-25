import React from "react";
import "./letter.scss";

type LetterProps = {
  letter: string;
  isCorrect: boolean | null;
  isExtra?: boolean;
};

const Letter: React.FC<LetterProps> = ({ letter, isCorrect, isExtra }) => {
  return (
    <span
      className={`letter ${
        isExtra
          ? "letter--extra"
          : isCorrect === null
          ? ""
          : isCorrect
          ? "letter--correct"
          : "letter--incorrect"
      }`}
    >
      {letter}
    </span>
  );
};

export default Letter;
