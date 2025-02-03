import { createSlice } from "@reduxjs/toolkit";

interface TextShiftState {
  translateY: number;
  currentLineIndex: number;
}

const initialState: TextShiftState = {
  translateY: 0,
  currentLineIndex: 1,
};

const textShiftSlice = createSlice({
  name: "textShift",
  initialState,
  reducers: {
    shiftTextUp: (state) => {
      state.translateY -= 48;
      state.currentLineIndex += 1;
    },
    resetTextShift: (state) => {
      state.translateY = 0;
      state.currentLineIndex = 1;
    },
  },
});

export const { shiftTextUp, resetTextShift } = textShiftSlice.actions;
export default textShiftSlice.reducer;
