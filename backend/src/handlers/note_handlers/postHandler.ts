import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { NoteType } from "../../db/schemas/note.js";
import { upsertData } from "../../utils/upsertData.js";
import { User } from "../../db/models.js";

export const postHandler = async (req: CustomRequest, res: Response) => {
    const noteData = req.body.note as NoteType

    const upsertNoteData: NoteType = {
        ...noteData,
        postedBy: req.user_name 
    }
    await upsertData(upsertNoteData, User)
    return res.sendStatus(200) 
}