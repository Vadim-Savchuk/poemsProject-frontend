import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../utils/axios'

const initialState = {
    poems: [],
    error: null,
    status: null,
    message: null,
    selectedPoem: [],
}

// Add Poem
export const addPoem = createAsyncThunk(
    'poems/addPoem',
    async (params, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.post('/poem/add', params)

            if (status !== 200) {
                throw new Error('Сталась помилка, не вдалось додати вірш!')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції addPoem. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось додати вірш!')
        }
    }
)

// Get all poems
export const getAllPoems = createAsyncThunk(
    'poems/getAllPoems',
    async (_, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.get('poem/')

            if (status !== 200) {
                throw new Error('Сталась помилка не вдалось отримати вірші!')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції getAllPoems. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось отримати вірші!')
        }
    }
)

// Remove Poem
export const removePoem = createAsyncThunk(
    'poems/removePoem',
    async (id, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.delete(`poem/${id}`, id)

            if (status !== 200) {
                throw new Error('Сталась помилка не вдалось видалити вірш!')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції removePoem. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось видалити вірш!')
        }
    }
)

// Liked poem
export const likedPoem = createAsyncThunk(
    'poems/likedPoem',
    async (id, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.put(`poem/liked/${id}`, { id })

            if (status !== 200) {
                throw new Error('Сталась помилка не вдалось вподобати вірш')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції likedPoem. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось вподобати вірш')
        }
    }
)

// Add or remove selcted poem
export const selectedPoem = createAsyncThunk(
    'poems/selectedPoem',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const { data, status } = await axios.post(`poem/selected`, { id })

            if (status !== 200) {
                throw new Error('Сталась помилка не вдалось додати вірш до вибраних')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції selectedPoem. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось додати вірш до вибраних')
        }
    }
)

// Get all selected poem
export const getAllselectedPoem = createAsyncThunk(
    'poems/getAllselectedPoem',
    async (_, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.get(`poem/all/selected`)

            if (status !== 200) {
                throw new Error('Сталась помилка не вдалось отримати всі обрані вірші')
            }

            return data
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції getAllselectedPoem. Error ${error}`);
            return rejectWithValue('Сталась помилка, не вдалось отримати всі обрані вірші')
        }
    }
)



export const poemsSlice = createSlice({
    name: 'poems',
    initialState,
    reducers: {},
    extraReducers: {
        // Add poem
        [addPoem.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [addPoem.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.poems.unshift(action.payload)
        },
        [addPoem.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Get all poems
        [getAllPoems.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getAllPoems.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.poems = action.payload
        },
        [getAllPoems.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Remove poems
        [removePoem.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [removePoem.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.poems = state.poems.filter(poem => {
                return poem._id !== action.payload._id
            })
        },
        [removePoem.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // liked poem
        [likedPoem.pending]: (state) => {
            state.error = null
        },
        [likedPoem.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            const index = state.poems.findIndex((poem) => poem._id === action.payload._id)
            state.poems[index] = action.payload
        },
        [likedPoem.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Selected poem
        [selectedPoem.pending]: (state) => {
            state.error = null
        },
        [selectedPoem.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            const poemExists = state.selectedPoem.some(poem => poem._id === action.payload.poem._id);
            if (poemExists) {
                const updated = state.selectedPoem.filter(poem => poem._id !== action.payload.poem._id)
                state.selectedPoem = updated
            } else {
                state.selectedPoem.push(action.payload.poem);
            }
        },
        [selectedPoem.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // Get all selected poem
        [getAllselectedPoem.pending]: (state) => {
            state.error = null
        },
        [getAllselectedPoem.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.selectedPoem = action.payload.selectedPoems
        },
        [getAllselectedPoem.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})

export default poemsSlice.reducer