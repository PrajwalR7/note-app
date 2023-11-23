import { Request, Response } from "express";
import { UserSchema } from "../db/schemas/user.js";
import { createUser } from "../utils/createUser.js";

export const handleUserRequests = async (req: Request, res: Response) => {
    console.log('handling user requests')
    const pathName = req.path.split("/")[2]
    console.log(pathName)
    switch (pathName) {
        case 'create': {
            const { user } = req.body
            res.send(await createUser(user))
            break
        }
        case 'delete': {
            break
        }
        default: {
            res.send({
                message: 'Required path is not present',
                status: 404
            })
        }
    }
}