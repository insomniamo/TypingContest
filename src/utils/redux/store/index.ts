import { configureStore } from "@reduxjs/toolkit";
import typingGameReducer from "@utils/redux/slices/typingGameSlice";

export const store = configureStore({
  reducer: {
    typingGame: typingGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
