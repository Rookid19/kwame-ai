import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../slices/notesSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false })], // Exclude serializableCheck middleware
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch