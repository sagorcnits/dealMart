import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartItem/cartSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    carts: cartSlice,
  },
});

export default store;
