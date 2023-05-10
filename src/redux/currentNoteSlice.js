import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}


export const currentNoteSlice = createSlice({
    name: 'currentNote',
    initialState,
    reducers: {
        setCurrentItem: (state=initialState, note) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = note.payload
        },
       
        
    },
});
export const { setCurrentItem } = currentNoteSlice.actions;
export default currentNoteSlice.reducer;