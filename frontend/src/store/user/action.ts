import { UserType } from "./reducer";

export enum UserActions {
    INSERT_USER = 'insert',
    UPDATE_USER = 'update_user',
    FLUSH_USER = 'flush'
}

export const insertUser = (payload: UserType) => {
    return {
        type: UserActions.INSERT_USER,
        payload
    }
}

export const updateUser = (payload: UserType) => {
    console.log('PAYLOAD FOR UPDATING USER - ', payload)
    return  {
        type: UserActions.UPDATE_USER,
        payload
    }
}

export const flushUser = () => {
    return {
        type: UserActions.FLUSH_USER
    }
}