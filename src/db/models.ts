import { Model, model } from "mongoose";
import { TodoSchema } from "./schemas/todo.js";
import { UserSchema } from "./schemas/user.js";

export const Todo = model('todo', TodoSchema)
export const User = model('user', UserSchema)