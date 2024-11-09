import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    removeCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToCart,removeCart } = cartSlice.actions;

export default cartSlice.reducer;
