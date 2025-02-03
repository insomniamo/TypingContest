import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchText } from "@utils/redux/api/textAPI";
import { createWordsArray, Word } from "@utils/createWordsArray";

interface TypingGameState {
  referenceText: string;
  wordsArray: Word[];
  currentInput: string;
  spacesCount: number;
  errorCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: TypingGameState = {
  referenceText: "",
  wordsArray: [],
  currentInput: "",
  spacesCount: 0,
  errorCount: 0,
  loading: false,
  error: null,
};

const typingGameSlice = createSlice({
  name: "typingGame",
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      const input = action.payload;
      const spacesCount = input.split(" ").length - 1;
      let errorCount = state.errorCount;

      state.wordsArray = state.wordsArray.map((wordObj, wordIndex) => {
        const inputWord = input.trim().split(/\s+/)[wordIndex] || "";
        const isActive = wordIndex === spacesCount;

        return {
          ...wordObj,
          isActive,
          word: wordObj.word.map((charObj, charIndex) => {
            if (charIndex < inputWord.length) {
              const isCorrect = inputWord[charIndex] === charObj.letter;
              if (!isCorrect && charObj.isCorrect !== false) {
                errorCount++;
              }
              return { ...charObj, isCorrect };
            }
            return { ...charObj, isCorrect: null };
          }),
        };
      });

      state.currentInput = input;
      state.spacesCount = spacesCount;
      state.errorCount = errorCount;
    },
    resetGame(state) {
      state.currentInput = "";
      state.errorCount = 0;
      state.spacesCount = 0;
      state.wordsArray = createWordsArray(state.referenceText);
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
        state.wordsArray = createWordsArray(action.payload); // Создаём массив слов
        state.loading = false;
      })
      .addCase(fetchText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInput, resetGame } = typingGameSlice.actions;
export default typingGameSlice.reducer;
