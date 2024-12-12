import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  
  reducers: {
    // layout folder root use
    addUser: (state, action) => {
      state.user = action.payload;
    },
    //  nabar use remove user
    removeUser: (state, action) => {
      state.user = null;
    
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
