import { Schema } from "mongoose";

export interface UserType {
    name: String,
    email: String,
    password: String
}

export const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})