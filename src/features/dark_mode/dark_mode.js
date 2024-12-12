import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = localStorage.getItem("theme") || "light";
const dark_mode = createSlice({
  name: "dark_mode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "black" : "light"; 
      localStorage.setItem("theme", newTheme); 
      return newTheme; 
    },
  },
});


export const {toggleTheme} = dark_mode.actions;

export default dark_mode.reducer;