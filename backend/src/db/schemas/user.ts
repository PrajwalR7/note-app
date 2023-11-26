import { Schema } from "mongoose";

export interface UserType {
    name: string,
    email: string,
    password: string
}

export const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})