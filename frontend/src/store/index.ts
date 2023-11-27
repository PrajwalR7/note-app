import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { userReducer } from "./user/reducer";
import { noteReducer } from "./note/reducer";

const reducer = combineReducers({
    user: userReducer,
    note: noteReducer
})

export const store = configureStore({
    reducer,
    middleware: [thunk]
})

export type AppState = ReturnType<typeof store.getState>