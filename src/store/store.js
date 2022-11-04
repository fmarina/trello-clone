import {configureStore} from '@reduxjs/toolkit'
import { boardReducer } from '../features/commons/reducer'

export const store = configureStore({
  reducer: {
    boardReducer,
  }
})