import mongoose, { Schema, Types } from "mongoose";

export interface NoteType {
    title: string,
    description: string,
    postedOn: Date,
    private: boolean,
    postedBy: string
    _id?: Types.ObjectId
}

export const NoteSchema = new Schema({
    title: String,
    description: String,
    postedOn: Date,
    private: Boolean,
    postedBy: String
})
