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
      let input = action.payload;
      let errorCount = state.errorCount;

      if (input.length > state.currentInput.length) {
        input = input.replace(/\s{2,}(?=\S)/g, " ");
      }

      input = input.replace(/^\s+/, "");

      let spacesCount = 0;
      let lastWasSpace = false;
      state.testFocused = true;

      for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
          if (!lastWasSpace) {
            spacesCount++;
          }
          lastWasSpace = true;
        } else {
          lastWasSpace = false;
        }
      }

      const words = input.trim().split(/\s+/);
      state.wordsArray = state.wordsArray.map((wordObj, wordIndex) => {
        const inputWord = words[wordIndex] || "";
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
      state.wordsArray = [];
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
