import { configureStore } from "@reduxjs/toolkit";
import typingGameReducer from "@utils/redux/slices/typingGameSlice";
import textShiftReducer from "@utils/redux/slices/textShiftSlice";
import settingsReducer from "@utils/redux/slices/settingsSlice"

export const store = configureStore({
  reducer: {
    typingGame: typingGameReducer,
    textShift: textShiftReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
