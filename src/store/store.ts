import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./langReducer";
import dataSlice from "./formReducer";

export const store = configureStore({
  reducer: {
    lang: langSlice,
    data: dataSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
