import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProduct >= 0) {
        state.carts[existingProduct].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.carts));
      } else {
        state.carts.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.carts));
      }
    },
    minusCart: (state, action) => {
      const existingProduct = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if ( existingProduct >= 0) {
        if (state.carts[existingProduct].quantity > 1) {
          state.carts[existingProduct].quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(state.carts));
        }
      } else {
        state.carts.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.carts));
      }
    },

    removeCart: (state, action) => {
      const filterProducts = state.carts.filter(
        (item) => item._id !== action.payload._id
      );
      state.carts = filterProducts;
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
  },
});

export const { addToCart, removeCart, minusCart } = cartSlice.actions;

export default cartSlice.reducer;
