import { createSlice } from "@reduxjs/toolkit";








const recevie_message_slice = createSlice({
  initialState : "true",
  name: "recevie_message_slice",
  reducers: {
    recevie_message: (state) => {
      state = state == "false" ? "true" : "false";
      return state;
    },
  },
});

export const { recevie_message } = recevie_message_slice.actions;

export default recevie_message_slice.reducer;
