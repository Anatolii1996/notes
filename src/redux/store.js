import { configureStore } from '@reduxjs/toolkit'
import idClickedReducer from "./idClickedSlice";

export const store = configureStore({
  reducer: {
    idClicked: idClickedReducer

  },
})