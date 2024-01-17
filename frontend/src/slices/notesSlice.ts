
import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
    },
    reducers: {
        fetchNotesData: (state, action) => {
            state.notes = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { fetchNotesData } = noteSlice.actions

export const notesData = (state: any) => state.notes.notes

export default noteSlice.reducer

// Redux Toolkit allows us to write "mutating" logic in reducers. 