import { LS_STORE_KEY } from "../consts"

export class StateManager {
    loadState() {
        const stateFromLS = localStorage.getItem(LS_STORE_KEY)

        if (!stateFromLS) {
            return this.initialState()
        }

        const parsedState = JSON.parse(stateFromLS)
        return parsedState
    }
    saveState(state: unknown) {
        if (localStorage.getItem(LS_STORE_KEY) !== null) {
            const stringifiedState = JSON.stringify({...state as {}, status: {}, note: []})
            localStorage.setItem(LS_STORE_KEY, stringifiedState)
        } 
    }
    initialState() {
        localStorage.setItem(LS_STORE_KEY, '')
        return {
            user: {},
            note: {},
            status: {},
        }
    }
}