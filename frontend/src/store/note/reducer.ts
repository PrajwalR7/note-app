import { Action } from "../../types"

export interface NoteType {
    title: string,
    description: string,
    postedOn: Date,
    private: boolean,
    author: string,
    authorID: string
    _id?: string
}

export const initialNoteState = []

export const noteReducer = (state: NoteType[] = initialNoteState, action: Action) => {
    switch(action.type) {
        case 'bulk_upsert': {
            return action.payload
        }
        default: {
            return state
        }
    }
}