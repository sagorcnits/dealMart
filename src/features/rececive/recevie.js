import { createSlice } from "@reduxjs/toolkit";

const recevieMessage =createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
})

export const { addMessage } = recevieMessage.actions;

export default recevieMessage.reducer;