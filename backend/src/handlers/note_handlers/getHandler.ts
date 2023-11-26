import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { Note, User } from "../../db/models.js";

export const getHandler = async (req: CustomRequest, res: Response) => {
    const findResult = await Note.find({
        private: { $eq: true },
        postedBy: { $eq: req.user_name }
    }).exec()

    const noteData = findResult.map(entry => {
        return  {
            title: entry.title,
            description: entry.description,
            postedOn: entry.postedOn,
            private: entry.private,
            postedBy: entry.postedBy
        }
    })

    return res.sendStatus(200).json({
        notes: noteData
    })
}