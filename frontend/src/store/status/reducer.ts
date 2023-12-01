import { Action } from "../../types"
import { STATUS_ACTIONS } from "./action"

export interface StatusType {
    loading: boolean
    error: boolean | string
    success: boolean
}

export const initialStatusState: StatusType = {
    loading: false,
    error: false,
    success: false
}

export const statusReducer = (state: StatusType = initialStatusState, action: Action) => {
    switch(action.type) {
        case STATUS_ACTIONS.POST_LOADING: {
            return {
                error: false,
                success: false,
                loading: true
            }
        }
        case STATUS_ACTIONS.POST_SUCCESS: {
            return {
                error: false,
                loading: false,
                success: true
            }
        }
        case STATUS_ACTIONS.POST_FAILURE: {
            if (action.payload) {
                return {
                    success: false,
                    loading: false,
                    error: action.payload    
                }
            }
            return {
                success: false,
                loading: false,
                error: true
            }
        }
        case STATUS_ACTIONS.RESET_STATUS: {
            return initialStatusState
        }
        default: {
            return state
        }
    }
}