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

export const initialNoteState: NoteType[] = []

export const noteReducer = (state: NoteType[] = initialNoteState, action: Action) => {
    switch(action.type) {
        case 'bulk_upsert': {
            state.push(action.payload as NoteType)
            return state
        }
        default: {
            return state
        }
    }
}