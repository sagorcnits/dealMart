import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    addCart: (state, action) => {
      const existProduct = state.carts.find(
        (item) => item._id === action.payload._id
      );

      if (existProduct) {
        return;
      }
      state.carts.push(action.payload);
    },

    removeCart: (state, action) => {
      const removeItem = state.carts.filter(
        (item) => item._id !== action.payload._id
      );
      state.carts = removeItem;
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
