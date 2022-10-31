import {configureStore} from '@reduxjs/toolkit'
import { boardReducer } from '../features/board/reducer'

export const store = configureStore({
  reducer: {
    boardReducer,
  }
})