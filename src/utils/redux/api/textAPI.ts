import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchText = createAsyncThunk(
  "typingGame/fetchText",
  async (params: { quoteLength?: number } = {}, { rejectWithValue }) => {
    const {quoteLength = 10 } = params;
    try {
      const response = await fetch(`https://fish-text.ru/get?format=json&number=${quoteLength}`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const data = await response.json();
      return data.text;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);
