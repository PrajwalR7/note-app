import { Request, Response } from "express";
import { UserType } from "../../db/schemas/user.js";
import { hashSync } from 'bcrypt'
import { upsertData } from "../../utils/upsertData.js";
import { User } from "../../db/models.js";

export const signupHandler = async (req: Request, res: Response) => {
    const userData = req.body
    const { name, email, password } = userData as UserType

    try {
        const hashedPassword = hashSync(password, 10)
        await upsertData({name, email, password: hashedPassword}, User)
        return res.sendStatus(200)
    } catch(e) {
        if (e.code === 11000) {
            return res.status(400).json({
                message: 'The entered username/email is already present please log in'
            })
        }
        return res.status(500).json({
            message: 'Something went wrong',
            cause: (e as Error).cause,
        })
    }
}