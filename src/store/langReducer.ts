import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  lang: "EN",
};

const langSlice = createSlice({
  name: "languege",
  initialState,
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
