import { AnyAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ThunkDispatch } from "redux-thunk"
import { MAIN_SERVER_URL } from "../../consts"

export enum NOTE_ACTIONS {
    BULK_UPSERT = "bulk_upsert",
    FAIL = "fail"
}

export const bulkUpsertAction = (payload: unknown) => {
    console.log('PAYLOAD - ', payload)
    return {
        type: NOTE_ACTIONS.BULK_UPSERT,
        payload
    }
}

export const failAction = (payload: unknown | undefined) => {
    return {
        type: NOTE_ACTIONS.FAIL,
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
            if (res.status === 200) {
                dispatch(bulkUpsertAction(res.data.notes))
            } else {
                dispatch(failAction)
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(failAction(err))
        })
    }
}