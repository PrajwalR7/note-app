import mongoose, { Schema } from "mongoose";

export const TodoSchema = new Schema({
    title: String,
    description: String,
    postedOn: Date,
    expirationDate: Date,
    postedBy: mongoose.Schema.ObjectId
})
