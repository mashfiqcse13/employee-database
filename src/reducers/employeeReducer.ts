import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Employee from '../types/employee.type'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {} as Employee,
    reducers: {
        setEmployee: (state, action:PayloadAction<Employee>) => {
            return action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEmployee } = employeeSlice.actions

export default employeeSlice.reducer