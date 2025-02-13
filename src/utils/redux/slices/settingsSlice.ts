import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  punctuation: boolean;
  mode: "words" | "time" | "quotes";
  wordsAmount: number;
  secondsAmount: number;
  quoteLength: number;
}

const initialState: SettingsState = {
  punctuation: false,
  mode: "time",
  wordsAmount: 10,
  secondsAmount: 15,
  quoteLength: 1,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    togglePunctuation: (state) => {
      state.punctuation = !state.punctuation;
    },
    setMode: (state, action: PayloadAction<"words" | "time" | "quotes">) => {
      state.mode = action.payload;
    },
    setWordsAmount: (state, action: PayloadAction<number>) => {
      state.wordsAmount = action.payload;
    },
    setSecondsAmount: (state, action: PayloadAction<number>) => {
      state.secondsAmount = action.payload;
    },
    setQuoteLength: (state, action: PayloadAction<number>) => {
      state.quoteLength = action.payload;
    },
  },
});

export const { togglePunctuation, setMode, setWordsAmount, setSecondsAmount, setQuoteLength } = settingsSlice.actions;
export default settingsSlice.reducer;
