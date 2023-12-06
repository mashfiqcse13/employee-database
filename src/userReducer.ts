import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import User from './types/user.type'

export const userSlice = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        save: (state, action: PayloadAction<User>) => {
            state.token = action.payload.token
        },
    },
})

// Action creators are generated for each case reducer function
export const { save } = userSlice.actions

export default userSlice.reducer