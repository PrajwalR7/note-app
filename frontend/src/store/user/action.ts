import { UserType } from "./reducer";

export enum UserActions {
    INSERT_USER = 'insert',
    UPDATE_USER = 'update'
}

export const insertUser = (payload: UserType) => {
    return {
        type: UserActions.INSERT_USER,
        payload
    }
}

export const updateUser = (payload: UserType) => {
    return  {
        type: UserActions.UPDATE_USER,
        payload
    }
}