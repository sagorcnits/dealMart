import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socketSlice",
    initialState: null,
    reducers:{
        setSocket:(state, action) => {
            return  action.payload
        }
    }
})


export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;