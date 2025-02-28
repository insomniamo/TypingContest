"use client";
import React, { useEffect, useRef, useState } from "react";
import "./typinggame.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@utils/redux/store";
import { fetchText } from "@utils/redux/api/textAPI";
import { resetTextShift } from "@utils/redux/slices/textShiftSlice";
import { setInput, resetGame, setWordsArray, changeSettings, setTestFocused } from "@utils/redux/slices/typingGameSlice";
import { createWordsArray } from "@utils/createWordsArray";

import RestartIcon from "@icons/RestartIcon";
import Words from "@components/Words/Words";
import Loader from "@components/Loader/Loader";
import Button from "@components/Button/Button";
import CapsWarning from "@components/CapsWarning/CapsWarning";
import FocusWarning from "@components/FocusWarning/FocusWarning";
import TimeTracker from "@components/TimeTracker/TimeTracker";
import WordsTracker from "@components/WordsTracker/WordsTracker";
import ShowResults from "@components/ShowResults/ShowResults";

const TypingGame = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const { punctuation, uppercase, mode, secondsAmount, quoteLength, wordsAmount } = useSelector(
    (state: RootState) => state.settings
  );

  const { wordsArray, currentInput, loading, error, referenceText, testFocused, gameActive } = useSelector(
    (state: RootState) => state.typingGame
  );

  // Загрузка текста
  useEffect(() => {
    if(mode === "quotes"){
      dispatch(fetchText({quoteLength}));
    } else {
      dispatch(fetchText({}));
    }
  }, [dispatch, punctuation, uppercase, mode, secondsAmount, quoteLength, wordsAmount]);

  // Обновление состояния игры при получении нового текста
  useEffect(() => {
    if (referenceText) {
      const words = createWordsArray(referenceText, punctuation, uppercase, mode, wordsAmount);
      dispatch(setWordsArray(words));
      dispatch(resetTextShift());
      dispatch(changeSettings());
    }
  }, [referenceText]);
  
  useEffect(() => {
    const handleFocusCheck = () => {
      setIsFocused(document.activeElement === inputRef.current);
    };
  
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current && !isFocused) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };
  
    document.addEventListener("focusin", handleFocusCheck);
    document.addEventListener("focusout", handleFocusCheck);
    document.addEventListener("keydown", handleKeyPress); 
  
    return () => {
      document.removeEventListener("focusin", handleFocusCheck);
      document.removeEventListener("focusout", handleFocusCheck);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isFocused]);
  
  // Фокусировка на инпуте при инициалзации
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, []);

  // Включение инпута после перезагрузки теста
  useEffect(() => {
    if (gameActive === "standby" && inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [gameActive]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(event.target.value));
  };

  // Загрузить новый текст и сбросить состояние игры
  const handleRefreshText = () => {
    dispatch(resetGame());
    dispatch(resetTextShift());
    if(mode === "quotes"){
      dispatch(fetchText({quoteLength}));
    } else {
      dispatch(fetchText({}));
    }
  };
  
  // Скрыть курсор при вводе текста
  useEffect(() => {
    if (testFocused) {
      document.body.classList.add("body-hidden-cursor");
    } else {
      document.body.classList.remove("body-hidden-cursor");
    }

    return () => {
      document.body.classList.remove("body-hidden-cursor");
    };
  }, [testFocused]);

  // Отобразить курсор при движении мыши
  useEffect(() => {
    const handleMouseMove = () => {
      dispatch(setTestFocused(false));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dispatch]);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target && inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Выключить инпут при завершении теста
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.disabled = gameActive === "false";
    }
  }, [gameActive]);
  

  return (
    <div className="typing-game">
      <CapsWarning />
      <div className="typing-game__tracker">
        {mode === "time" ? <TimeTracker/> : <WordsTracker/>}
      </div>
      <div className="typing-game__wrapper" onMouseDown={handleBackgroundClick}>
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className={`typing-game__input ${testFocused ? "typing-game__input--cursorhidden" : ""}`}
          autoFocus
          ref={inputRef}
        />
        {((gameActive === "true" || gameActive === "standby") && !loading && !isFocused) && <FocusWarning/>}
        {gameActive === "false" && !loading && <ShowResults />}
        {loading ? <Loader /> : <Words wordsArray={wordsArray} isFocused={isFocused}/>}
        {error && <p className="error">Ошибка: {error}</p>}
      </div>

      <Button style={["iconed"]} onClickEvent={handleRefreshText} onMouseDown={(e) => e.preventDefault()}>
        <RestartIcon />
      </Button>
    </div>
  );
};

export default TypingGame;