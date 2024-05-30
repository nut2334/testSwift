import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./langReducer";
import dataSlice from "./formReducer";

export const store = configureStore({
  reducer: {
    lang: langSlice,
    data: dataSlice,
  },
});
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
