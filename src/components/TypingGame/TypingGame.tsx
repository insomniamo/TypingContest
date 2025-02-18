"use client";
import React, { useEffect, useRef } from "react";
import "./typinggame.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@utils/redux/store";
import { fetchText } from "@utils/redux/api/textAPI";
import { resetTextShift } from "@utils/redux/slices/textShiftSlice";
import { setInput, resetGame, setWordsArray } from "@utils/redux/slices/typingGameSlice";
import { createWordsArray } from "@utils/createWordsArray";

import RestartIcon from "@icons/RestartIcon";
import Words from "@components/Words/Words";
import Loader from "@components/Loader/Loader";
import Button from "@components/Button/Button";
import CapsWarning from "@components/CapsWarning/CapsWarning";

const TypingGame = () => {
  const punctuation = useSelector((state: RootState) => state.settings.punctuation);
  const uppercase = useSelector((state: RootState) => state.settings.uppercase);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { wordsArray, currentInput, loading, error, referenceText } = useSelector(
    (state: RootState) => state.typingGame
  );

  useEffect(() => {
    dispatch(fetchText());
  }, [dispatch, punctuation, uppercase]);

  useEffect(() => {
    if (referenceText) {
      const words = createWordsArray(referenceText, punctuation, uppercase);
      dispatch(setWordsArray(words));
    }
  }, [referenceText]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(event.target.value));
  };

  const handleRefreshText = () => {
    dispatch(fetchText());
    dispatch(resetGame());
    dispatch(resetTextShift());
  };
  
  return (
    <div className="typing-game">
      <CapsWarning />
      <div className="typing-game__wrapper">
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="typing-game__input"
          autoFocus
          ref={inputRef}
        />
        {loading ? <Loader /> : <Words wordsArray={wordsArray} />}
        {error && <p className="error">Ошибка: {error}</p>}
      </div>

      <Button style={["iconed"]} onClickEvent={handleRefreshText}>
        <RestartIcon />
      </Button>
    </div>
  );
};

export default TypingGame;
