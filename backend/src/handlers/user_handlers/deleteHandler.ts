import { Request, Response } from "express";
import { User } from "../../db/models.js";

export const deleteHandler = async (req: Request, res: Response) => {
    const { email } = req.query
    await User.deleteOne({
        email: { $eq: email }
    }).exec()
}