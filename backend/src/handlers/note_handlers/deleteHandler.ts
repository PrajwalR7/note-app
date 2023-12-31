import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { Note } from "../../db/models.js";

export const deleteHandler = async (req: CustomRequest, res: Response) => {
    const note_id = req.query.note_id
    if (!note_id) {
        return res.status(403).json({
            message: 'Invalid request, expected \'note_id\' found none'
        })
    }
    const deleteResult = await Note.deleteOne({
        _id: { $eq: note_id }
    }).exec()
    
    if (!deleteResult.acknowledged) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the note'
        })
    }

    return res.sendStatus(200)
}