"use client";
import React, { useEffect } from "react";
import "./typinggame.scss"

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@utils/redux/store";
import { fetchText } from "@utils/redux/api/textAPI";
import { resetTextShift } from "@utils/redux/slices/textShiftSlice";
import { setInput, resetGame } from "@utils/redux/slices/typingGameSlice";

import RestartIcon from "@icons/RestartIcon";
import Words from "@components/Words/Words";
import Loader from "@components/Loader/Loader";
import Button from "@components/Button/Button";

const TypingGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wordsArray, currentInput, loading, error } = useSelector(
    (state: RootState) => state.typingGame
  );

  useEffect(() => {
    dispatch(fetchText());
  }, [dispatch]);

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
        
      <div className="typing-game__wrapper">
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="typing-game__input"
          autoFocus
        />
        {loading ? <Loader /> : <Words wordsArray={wordsArray} />}
        {error && <p className="error">Ошибка: {error}</p>}
      </div>

      <Button style={["iconed"]} onClickEvent={handleRefreshText}>
        <RestartIcon/>
      </Button>

      {/* <div className="error-count">
        <p>Ошибок: {errorCount}</p>
      </div> */}
    </div>
  );
};

export default TypingGame;
