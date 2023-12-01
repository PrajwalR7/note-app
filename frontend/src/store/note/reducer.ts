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
        case 'insert_note': {
            return [
                ...state,
                action.payload as NoteType
            ]
        }
        case 'update_note': {
            const updatedObject = action.payload as NoteType
            for (let i=0;i<state.length;i++) {
                console.log(state[i]._id, updatedObject._id)
                if (state[i]._id === updatedObject._id) {
                    console.log('BEFORE UPDATING', state[i])
                    state[i] = updatedObject
                    console.log('AFTER UPDATING', state[i])
                    break
                }
            }
            return state
        }
        case 'delete_note': {
            const id = action.payload as string
            return state.filter(note => note._id !== id)
        }
        default: {
            return state
        }
    }
}