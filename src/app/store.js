import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartItem/cartSlice";
import chat_slice from "../features/chat_active/chat_slice";
import dark_mode from "../features/dark_mode/dark_mode";
import recevie_message_slice from "../features/recevie_message/recevie_message";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    carts: cartSlice,
    darkMode:dark_mode,
    chat_slice: chat_slice,
    recevie_message_slice: recevie_message_slice,
  },
});

export default store;
