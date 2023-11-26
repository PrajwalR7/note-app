import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { Note } from "../../db/models.js";
import { NoteType } from "../../db/schemas/note.js";

export const updateHandler = async (req: CustomRequest, res: Response) => {
    const updatedNote = req.body.note as NoteType
    const updatedResult = await Note.updateOne({
        _id: { $eq: updatedNote._id }
    }, updatedNote).exec()
    
    if (!updatedResult.acknowledged) {
        return res.sendStatus(500).json({
            message: 'Something went wrong while updating the note'
        })
    }
    
    return res.sendStatus(200)
}