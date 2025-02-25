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

const TypingGame = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const { punctuation, uppercase } = useSelector(
    (state: RootState) => state.settings
  );

  const { wordsArray, currentInput, loading, error, referenceText, testFocused } = useSelector(
    (state: RootState) => state.typingGame
  );

  useEffect(() => {
    dispatch(fetchText());
  }, [dispatch, punctuation, uppercase]);

  useEffect(() => {
    if (referenceText) {
      const words = createWordsArray(referenceText, punctuation, uppercase);
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
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(event.target.value));
  };
  const handleRefreshText = () => {
    dispatch(resetGame());
    dispatch(resetTextShift());
    dispatch(fetchText());
  };
  
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
  
  return (
    <div className="typing-game">
      <CapsWarning />
      <div className="typing-game__wrapper" onMouseDown={handleBackgroundClick}>
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className={`typing-game__input ${testFocused ? "typing-game__input--cursorhidden" : ""}`}
          autoFocus
          ref={inputRef}
        />
        {!isFocused && <FocusWarning/>}
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