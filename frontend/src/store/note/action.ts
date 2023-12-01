import { AnyAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ThunkDispatch } from "redux-thunk"
import { MAIN_SERVER_URL, TOKEN_EXPIRED_ERROR } from "../../consts"
import { NoteType } from "./reducer"
import { AppDispatch } from ".."
import { failureAction, loadingAction, successAction } from "../status/action"

export enum NOTE_ACTIONS {
    BULK_UPSERT = "bulk_upsert",
    FAIL = "fail",
    UPDATE = "update_note",
    INSERT = 'insert_note',
    DELETE = 'delete_note'
}

export const bulkUpsertAction = (payload: unknown) => {
    return {
        type: NOTE_ACTIONS.BULK_UPSERT,
        payload
    }
}

export const insertNote = (payload: unknown) => {
    return {
        type: NOTE_ACTIONS.INSERT,
        payload
    }
}

export const updateAction = (payload: NoteType) => {
    console.log('PAY for update', payload)
    return {
        type: NOTE_ACTIONS.UPDATE,
        payload
    }
}

export const deleteAction = (payload: string) => {
    return  {
        type: NOTE_ACTIONS.DELETE,
        payload
    }
}

export const fetchPosts = (accessToken: string) => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        axios.get(`${MAIN_SERVER_URL}/notes`, {
            headers: {
                Authorization: accessToken
            }
        })
        .then(res => {
            if (res.data.error === TOKEN_EXPIRED_ERROR) {
                dispatch(failureAction(TOKEN_EXPIRED_ERROR))
            }
            if (res.status === 200) {
                dispatch(bulkUpsertAction(res.data.notes))
            } else {
                dispatch(failureAction())
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(failureAction())
        })
    }
}

export const newPost = (postObj: NoteType, accessToken: string) => {
    console.log('New post obj inside action', postObj)
    return (dispatch: AppDispatch) => {
        dispatch(loadingAction())
        axios.post(`${MAIN_SERVER_URL}/notes`, {
            note: postObj
        }, {
            headers: {
                Authorization: accessToken 
            }
        })
        .then(res => {
            if (res.data.error === TOKEN_EXPIRED_ERROR) {
                dispatch(failureAction(TOKEN_EXPIRED_ERROR))
            }
            dispatch(successAction())
            dispatch(insertNote(res.data))
        })
        .catch(() => {
            dispatch(failureAction())
        })
    }
}

export const updatePost = (updateObj: NoteType, accessToken: string) => {
    console.log(updateObj)
    return (dispatch: AppDispatch) => {
        dispatch(loadingAction())
        axios.put(`${MAIN_SERVER_URL}/notes`, {
            note: updateObj
        }, {
            headers: {
                Authorization: accessToken 
            }
        })
        .then(() => {
            dispatch(successAction())
            dispatch(updateAction(updateObj))
        })
        .catch(() => {
            dispatch(failureAction())
        })
    }
}

export const deletPost = (noteID: string, accessToken: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(loadingAction())
        axios.delete(`${MAIN_SERVER_URL}/notes?note_id=${noteID}`, {
            headers: {
                Authorization: accessToken 
            }
        })
        .then(() => {
            dispatch(successAction())
            dispatch(deleteAction(noteID))
        })
        .catch(() => {
            dispatch(failureAction())
        })
    }
}