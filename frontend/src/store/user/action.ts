import axios from "axios";
import { AppDispatch } from "..";
import { AUTH_SERVER_URL } from "../../consts";
import { UserType } from "./reducer";

export enum UserActions {
    INSERT_USER = 'insert',
    UPDATE_USER = 'update',
    FLUSH_USER = 'flush'
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

export const flushUser = () => {
    return {
        type: UserActions.FLUSH_USER
    }
}