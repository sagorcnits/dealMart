import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartItem/cartSlice";
import dark_mode from "../features/dark_mode/dark_mode";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    carts: cartSlice,
    darkMode:dark_mode,
  },
});

export default store;
