"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@utils/redux/store";
import { fetchText } from "@utils/redux/api/textAPI";
import { resetTextShift } from "@utils/redux/slices/textShiftSlice";
import { setInput, resetGame } from "@utils/redux/slices/typingGameSlice";
import Words from "@components/Words/Words";

const TypingGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wordsArray, currentInput, errorCount, loading, error } = useSelector(
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
      {loading && <p>Загрузка текста...</p>}
      {error && <p className="error">Ошибка: {error}</p>}

      <input
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        className="invisible-input"
        autoFocus
      />

      <Words wordsArray={wordsArray} />

      <button onClick={handleRefreshText} className="refresh-button">
        Обновить текст
      </button>

      <div className="error-count">
        <p>Ошибок: {errorCount}</p>
      </div>
    </div>
  );
};

export default TypingGame;
