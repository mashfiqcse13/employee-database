import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import employeeReducer from './reducers/employeeReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer
  },
})