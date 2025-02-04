import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@utils/redux/store";
import { shiftTextUp } from "@utils/redux/slices/textShiftSlice";
import Word from "@components/Word/Word";
import "./words.scss";

type LetterType = {
  letter: string;
  isCorrect: boolean | null;
};

type WordType = {
  word: LetterType[];
  isActive: boolean;
};

type WordsProps = {
  wordsArray: WordType[];
};

const Words: React.FC<WordsProps> = ({ wordsArray }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<number[]>([]);
  const [errorWords, setErrorWords] = useState<Set<number>>(new Set()); // Состояние для ошибок
  
  const spacesCount = useSelector((state: RootState) => state.typingGame.spacesCount);
  const currentInput = useSelector((state: RootState) => state.typingGame.currentInput);
  const translateY = useSelector((state: RootState) => state.textShift.translateY);
  const currentLineIndex = useSelector((state: RootState) => state.textShift.currentLineIndex);
  const dispatch = useDispatch();

  const calculateLines = () => {
    if (!containerRef.current) return;

    const children = Array.from(containerRef.current.children) as HTMLElement[];
    const newLines: number[] = [];
    let currentLineCount = 0;
    let lastOffsetTop = children[0]?.offsetTop || 0;

    children.forEach((child, index) => {
      if (child.offsetTop !== lastOffsetTop) {
        newLines.push(currentLineCount);
        currentLineCount = 0;
        lastOffsetTop = child.offsetTop;
      }
      currentLineCount++;
      if (index === children.length - 1) {
        newLines.push(currentLineCount);
      }
    });

    setLines(newLines);
  };

  useEffect(() => {
    const newErrorWords = new Set<number>();

    wordsArray.forEach((wordObj, index) => {
      if (index < spacesCount) {
        if (wordObj.word.some((char) => char.isCorrect === false)) {
          newErrorWords.add(index);
        }
      }
      if (index < spacesCount && wordObj.word.some((char) => char.isCorrect === false)) {
        newErrorWords.add(index);
      }
    });

    setErrorWords(newErrorWords);
  }, [wordsArray, spacesCount, lines]);

  useEffect(() => {
    calculateLines();

    const observer = new ResizeObserver(calculateLines);
    if (containerRef.current) observer.observe(containerRef.current);

    const handleResize = () => calculateLines();
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [wordsArray]);

  useEffect(() => {
    if (lines.length > 1 && currentLineIndex < lines.length) {
      const wordsUpToCurrentLine = lines.slice(0, currentLineIndex + 1).reduce((sum, count) => sum + count, 0);
      if (spacesCount >= wordsUpToCurrentLine) {
        dispatch(shiftTextUp());
      }
    }
  }, [spacesCount, lines, currentLineIndex, dispatch]);

  const activeWordIndex = spacesCount;
  const activeLetterIndex = wordsArray[activeWordIndex]?.word.length
    ? currentInput.length - currentInput.lastIndexOf(" ") - 1
    : 0;

  return (
    <div className="words">
      <div className="words__arr" ref={containerRef} style={{ transform: `translateY(${translateY}px)` }}>
        {wordsArray.map((wordObj, index) => (
          <Word
            key={index}
            wordObj={wordObj}
            currentLetterIndex={index === activeWordIndex ? activeLetterIndex : -1}
            isError={errorWords.has(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Words;