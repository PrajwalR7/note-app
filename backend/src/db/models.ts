import { model } from "mongoose";
import { NoteSchema } from "./schemas/note.js";
import { UserSchema } from "./schemas/user.js";

export const Note = model('todo', NoteSchema)
export const User = model('user', UserSchema)