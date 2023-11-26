import { Schema } from "mongoose";

export interface UserType {
    name: string,
    email: string,
    password: string
}

export const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
})