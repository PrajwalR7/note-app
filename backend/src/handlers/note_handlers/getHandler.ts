import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { Note } from "../../db/models.js";

export const getHandler = async (req: CustomRequest, res: Response) => {
    const findResult = await Note.find({
        $or: [
            { author: { $eq: req.user_name } },
            { private: {$eq: false} }
        ]
    }).exec()

    const noteData = findResult.map(entry => {
        return  {
            title: entry.title,
            description: entry.description,
            postedOn: entry.postedOn,
            private: entry.private,
            author: entry.author,
            authorID: entry.authorID
        }
    })

    return res.status(200).json({
        notes: noteData
    })
}