import { Action } from "../../types"

export interface UserType {
    name?: string,
    email?: string,
    password?: string,
    accessToken?: string,
    _id?: string
}

export const initialUserState = {
    name: '',
    email: '',
    password: '',
    accessToken: '',
    _id: ''
}

export const userReducer = (state: UserType, action: Action) => {
    switch(action.type) {
        case 'insert': {
            return action.payload
        }
        case 'update': {
            return {
                ...state,
                ...(action.payload as UserType)
            }
        }
        default: {
            return state
        }
    }
}