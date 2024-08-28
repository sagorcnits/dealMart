import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
  },
});

export default store;
