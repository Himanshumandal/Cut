import { configureStore } from '@reduxjs/toolkit'
import filmaReducer from './filmaSlice'

export const store = configureStore({
  reducer: {
    filmaData:filmaReducer,
  },
})


