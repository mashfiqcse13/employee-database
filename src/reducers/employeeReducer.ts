import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Employee, { EmployeeStore } from '../types/employee.type'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        loading: false,
        data: {}
    } as EmployeeStore,
    reducers: {
        setEmployee: (state, action: PayloadAction<Employee>) => {
            const data = action.payload
            const loading = state.loading
            return { loading, data }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            const loading = action.payload
            const data = state.data
            return { loading, data }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEmployee, setLoading } = employeeSlice.actions

export default employeeSlice.reducer