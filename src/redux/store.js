import { configureStore } from '@reduxjs/toolkit'
import idClickedReducer from "./idClickedSlice";
import currentNoteReducer from "./currentNoteSlice"

export const store = configureStore({
  reducer: {
    idClicked: idClickedReducer,
    currentNote: currentNoteReducer,

  },
})