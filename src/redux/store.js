import { configureStore } from '@reduxjs/toolkit'

import authSlice     from './features/authSlice'
import messagesSlice from './features/messagesSlice'
import poemsSlice    from './features/poemsSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        poems: poemsSlice,
        messages: messagesSlice
    }
})