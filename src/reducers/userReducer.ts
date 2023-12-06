import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import User from '../types/user.type'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name:"",
        token:""
    } as User,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setName,setToken } = userSlice.actions

export default userSlice.reducer