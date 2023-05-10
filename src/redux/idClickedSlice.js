import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const idClickedSlice = createSlice({
    name: 'idClicked',
    initialState,
    reducers: {
        setClicked: (state=initialState, id) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = id.payload
        },
       
        
    },
});

export const currentNoteSlice = createSlice({
    name: 'currentNote',
    
    reducers: {
        currentNote: (state=initialState, note) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = note.payload
        },
       
        
    },
});

// Action creators are generated for each case reducer function
export const { setClicked } = idClickedSlice.actions;

export default idClickedSlice.reducer;
// const idClickedReducer=()=>{

// };
// export default idClickedReducer;