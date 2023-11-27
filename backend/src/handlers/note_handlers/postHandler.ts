import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { NoteType } from "../../db/schemas/note.js";
import { upsertData } from "../../utils/upsertData.js";
import { Note, User } from "../../db/models.js";

export const postHandler = async (req: CustomRequest, res: Response) => {
    const noteData = req.body.note as NoteType
    console.log('New note data - ', noteData)

    const authorDetails = await User.findOne({
        name: { $eq: req.user_name }
    }).exec()

    const upsertNoteData: NoteType = {
        ...noteData,
        authorID: authorDetails._id,
        author: req.user_name 
    }
    await upsertData(upsertNoteData, Note)
    return res.sendStatus(200) 
}