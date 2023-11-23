import { Request, Response } from "express"
import { Todo } from "../db/models.js"

export const handleGetTodos = async (req: Request, res: Response) => {
    const result = await Todo.find()
    res.send({
        data: result
    })
}