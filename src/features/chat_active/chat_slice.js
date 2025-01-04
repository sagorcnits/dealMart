import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user");

const chat_active_slice = createSlice({
  initialState,
  name: "chat_slice",
  reducers: {
    chat_active: (state) => {
      state = "active";
      localStorage.setItem("user", "active");
      return state;
    },
  },
});

export const { chat_active } = chat_active_slice.actions;

export default chat_active_slice.reducer;
