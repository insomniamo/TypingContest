import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchText } from "@utils/redux/api/textAPI";
import { Word } from "@utils/createWordsArray";

interface TypingGameState {
  referenceText: string;
  wordsArray: Word[];
  currentInput: string;
  spacesCount: number;
  errorCount: number;
  loading: boolean;
  error: string | null;
  testFocused: boolean;
}

const initialState: TypingGameState = {
  referenceText: "",
  wordsArray: [],
  currentInput: "",
  spacesCount: 0,
  errorCount: 0,
  loading: false,
  error: null,
  testFocused: false,
};

const typingGameSlice = createSlice({
  name: "typingGame",
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      let input = action.payload.trimStart();
      let errorCount = state.errorCount;

      // Убираем повторяющиеся пробелы и считаем их количество
      input = input.replace(/\s{2,}/g, " ");
      const spacesCount = (input.match(/\s/g) || []).length;

      state.testFocused = true;

      const words = input.split(" ");

      state.wordsArray = state.wordsArray.map((wordObj, wordIndex) => {
        const inputWord = words[wordIndex] || "";
        const isActive = wordIndex === spacesCount;
        const newWord = [...wordObj.word];

        for (let i = 0; i < inputWord.length; i++) {
          if (i < newWord.length) {
            const isCorrect = inputWord[i] === newWord[i].letter && !newWord[i].isExtra;
            if (!isCorrect && newWord[i].isCorrect !== false) errorCount++;
            newWord[i] = { ...newWord[i], isCorrect };
          } else {
            // Лишний символ всегда помечается как isExtra и isCorrect: false
            newWord.push({ letter: inputWord[i], isCorrect: false, isExtra: true });
            errorCount++; // Учитываем ошибку за лишний символ
          }
        }        

        // Удаляем все `isExtra` символы при стирании
        while (newWord.length > inputWord.length && newWord[newWord.length - 1].isExtra) {
          newWord.pop();
        }

        // Если стерли символ исходного слова, устанавливаем `isCorrect: null`
        for (let i = inputWord.length; i < newWord.length; i++) {
          if (!newWord[i].isExtra) {
            newWord[i] = { ...newWord[i], isCorrect: null };
          }
        }

        return { ...wordObj, isActive, word: newWord };
      });

      state.currentInput = input;
      state.spacesCount = spacesCount;
      state.errorCount = errorCount;
    },
    resetGame(state) {
      Object.assign(state, initialState);
    },
    changeSettings(state) {
      state.currentInput = "";
      state.errorCount = 0;
      state.spacesCount = 0;
    },
    setWordsArray(state, action: PayloadAction<Word[]>) {
      state.wordsArray = action.payload;
    },
    setTestFocused(state, action: PayloadAction<boolean>) {
      state.testFocused = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchText.fulfilled, (state, action: PayloadAction<string>) => {
        state.referenceText = action.payload;
        state.loading = false;
      })
      .addCase(fetchText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInput, resetGame, setWordsArray, changeSettings, setTestFocused } = typingGameSlice.actions;
export default typingGameSlice.reducer;
