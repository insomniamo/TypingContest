import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchText } from "@utils/redux/api/textAPI";
import { Word } from "@utils/createWordsArray";

interface TypingGameState {
  referenceText: string;
  wordsArray: Word[];
  currentInput: string;
  spacesCount: number;
  errorCount: number;
  correctWords: number;
  lockedWords: number[];
  loading: boolean;
  error: string | null;
  testFocused: boolean;
  gameActive: "standby" | "true" | "false";
}

const initialState: TypingGameState = {
  referenceText: "",
  wordsArray: [],
  currentInput: "",
  spacesCount: 0,
  errorCount: 0,
  correctWords: 0,
  lockedWords: [],
  loading: false,
  error: null,
  testFocused: false,
  gameActive: "standby",
};

const typingGameSlice = createSlice({
  name: "typingGame",
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      const input = action.payload.trimStart();
    
      let errorCount = state.errorCount;
      let correctWords = state.correctWords;
      const words = input.split(" ");
    
      // Запрещаем ввод двух пробелов подряд
      if (input.endsWith(" ") && state.currentInput.endsWith(" ")) {
        return;
      }
    
      const spacesCount = (input.match(/\s/g) || []).length;
    
      // Если пытаемся удалить пробел перед заблокированным словом, запрещаем это
      if (spacesCount < state.spacesCount && state.lockedWords.includes(spacesCount)) {
        return;
      }
    
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
            newWord.push({ letter: inputWord[i], isCorrect: false, isExtra: true });
            errorCount++;
          }
        }
    
        while (newWord.length > inputWord.length && newWord[newWord.length - 1].isExtra) {
          newWord.pop();
        }
    
        for (let i = inputWord.length; i < newWord.length; i++) {
          if (!newWord[i].isExtra) {
            newWord[i] = { ...newWord[i], isCorrect: null };
          }
        }
    
        return { ...wordObj, isActive, word: newWord };
      });
    
      // Проверка предыдущего слова после нажатия пробела
      if (spacesCount > state.spacesCount) {
        const prevWordIndex = spacesCount - 1;
        if (
          state.wordsArray[prevWordIndex] &&
          state.wordsArray[prevWordIndex].word.every((char) => char.isCorrect === true)
        ) {
          correctWords++;
          if (!state.lockedWords.includes(prevWordIndex)) {
            state.lockedWords.push(prevWordIndex); // Блокируем изменение слова
          }
        }
      }
    
      // Проверка последнего слова на правильность
      const lastWordIndex = state.wordsArray.length - 1;

      if (spacesCount >= lastWordIndex + 1 && input.endsWith(" ")) {
        return;
      }

      if (spacesCount >= lastWordIndex) {
        const lastWordCorrect = state.wordsArray[lastWordIndex].word.every((char) => char.isCorrect === true);
        if (lastWordCorrect) {
          correctWords++;
          if (!state.lockedWords.includes(lastWordIndex)) {
            state.lockedWords.push(lastWordIndex);
          }
          
          state.correctWords = correctWords;
          state.lockedWords = [...state.lockedWords];
      
          state.gameActive = "false";
          state.testFocused = false;
          return;
        }
      }
    
      state.currentInput = input;
      state.spacesCount = spacesCount;
      state.errorCount = errorCount;
      state.correctWords = correctWords;
      
      if (input.length > 0) {
        state.testFocused = true;
        state.gameActive = "true";
      }
    },
    
    
    resetGame(state) {
      Object.assign(state, initialState);
    },
    changeSettings(state) {
      state.currentInput = "";
      state.errorCount = 0;
      state.correctWords = 0;
      state.spacesCount = 0;
      state.lockedWords = [];
      state.gameActive = "standby";
    },
    setGameActive(state, action: PayloadAction<"standby" | "true" | "false">) {
      state.gameActive = action.payload;
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

export const { setInput, resetGame, setWordsArray, changeSettings, setTestFocused, setGameActive } = typingGameSlice.actions;
export default typingGameSlice.reducer;