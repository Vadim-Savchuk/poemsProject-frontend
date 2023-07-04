import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../utils/axios'

const initialState = {
    user: null,
    error: null,
    status: null,
    token: null,
    message: null
}

// Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.post('/auth/register', {
                username,
                password
            })

            if (status !== 200) {
                throw new Error('Сталась помилка, не вдалось зареєструватись')
            }

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції registerUser. Error ${error}`);
            rejectWithValue('Сталась помилка, не вдалось зареєструватись')
        }
    }
)

// Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.post('/auth/login', {
                username,
                password
            })

            if (status !== 200) {
                throw new Error('Сталась помилка, не вдалось авторизуватись')
            }

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції loginUser. Error ${error}`);
            rejectWithValue('Сталась помилка, не вдалось авторизуватись')
        }
    }
)

// Get User
export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const { data } = await axios.get('/auth/me')

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції getUser. Error ${error}`);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.error = null
            state.status = null
            state.token = null
            state.message = null
        }
    },
    extraReducers: {
        // Register User
        [registerUser.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.user = action.payload?.newUser
            state.token = action.payload?.token
        },
        [registerUser.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Login User
        [loginUser.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.user = action.payload?.user
            state.token = action.payload?.token
            state.message = action.payload?.message

        },
        [loginUser.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Get User
        [getUser.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getUser.fulfilled]: (state, action) => {
            state.status  = 'fulfilled'
            state.user    = action.payload?.user
            state.token   = action.payload?.token
            state.message = action.payload?.message
        },
        [getUser.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload.message
        },
    },
})

export const checkIsAuth = (state) => {
    return Boolean(state.auth.token)
}

export const { logout } = authSlice.actions
export default authSlice.reducer