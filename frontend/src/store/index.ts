import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from 'redux-thunk'
import { userReducer } from "./user/reducer";
import { noteReducer } from "./note/reducer";
import { StateManager } from "../utils/stateManager";

const stateManager = new StateManager()

const reducer = combineReducers({
    user: userReducer,
    note: noteReducer
})

const store = configureStore({
    reducer,
    middleware: [thunk],
    preloadedState: stateManager.loadState()
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<{}, {}, AnyAction>

export default store