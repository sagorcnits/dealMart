import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase_config";

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
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      }); 
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
