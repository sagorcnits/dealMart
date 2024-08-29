import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartItem/cartSlice";
import productSlice from "../features/products/productSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    carts: cartSlice,
  },
});

export default store;
