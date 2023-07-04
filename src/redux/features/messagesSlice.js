import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    messages: []
})

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state, action) => {
            state.messages.push(action.payload)
        },
        removeMessages: (state) => {
            state.messages.pop()
        }
    }
})

export const { addMessages, removeMessages } = messagesSlice.actions
export default messagesSlice.reducer