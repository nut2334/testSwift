import { createSlice, current } from "@reduxjs/toolkit";

export interface DataState {
  Birthday: string;
  "Citizen ID": string;
  "Expected Salary": string;
  Firstname: string;
  Gender: string;
  Lastname: string;
  "Mobile Phone": string;
  Nationality: string;
  "Passport No": string;
  Title: string;
  prefix: string;
  key: string;
}

const initialState = {
  data: [] as DataState[],
  current: {} as DataState,
  selectAll: [] as string[],
};

const saveLocal = (data: DataState[]) => {
  window.localStorage.setItem("data", JSON.stringify(data));
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    insertData(state, action) {
      console.log(action.payload);
      if (action.payload.key) {
        state.data = state.data.map((item) => {
          if (item.key === action.payload.key) {
            return action.payload;
          }
          return item;
        });
        saveLocal(state.data);
        return;
      }
      state.data.push({
        ...action.payload,
        key: Math.random().toString(36).substring(7),
      });
      console.log(current(state));
      saveLocal(state.data);
    },
    deleteData(state, action) {
      state.data = state.data.filter((item) => item.key !== action.payload);
      saveLocal(state.data);
    },
    editData(state, action) {
      var data = state.data.find((item) => item.key === action.payload);
      if (data === undefined) {
        return;
      }
      state.current = data;
      console.log(current(state));
    },
    selectAll(state) {
      if (state.selectAll.length === state.data.length) {
        state.selectAll = [];
        return;
      }
      state.selectAll = state.data.map((item) => item.key);
    },
    setSelect(state, action) {
      state.selectAll = action.payload;
    },
    deleteSelect(state) {
      state.data = state.data.filter(
        (item) => !state.selectAll.includes(item.key)
      );
      state.selectAll = [];
      saveLocal(state.data);
    },
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {
  insertData,
  deleteData,
  editData,
  selectAll,
  setSelect,
  deleteSelect,
  setData,
} = dataSlice.actions;
export default dataSlice.reducer;
