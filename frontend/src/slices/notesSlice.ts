
import { createSlice } from '@reduxjs/toolkit'

export const courseSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
    },
    reducers: {
        fetchCoursesData: (state, action) => {
            state.notes = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { fetchCoursesData } = courseSlice.actions

export const notesData = (state: any) => state.notes.notes

export default courseSlice.reducer

// Redux Toolkit allows us to write "mutating" logic in reducers. 