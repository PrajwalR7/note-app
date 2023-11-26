import { Request, Response } from "express";
import { User } from "../../db/models.js";

export const getHandler = async (req: Request, res: Response) => {
    const pathname = req.path.split("/")[2].split('?')[0]

    switch(pathname) {
        case 'get': {
            const { email } = req.query
            const result = await User.findOne({
                email: {$eq: email}
            }).exec()
            res.send({
                user: {
                    name: result.name,
                    email: result.email
                }
            })
            break
        }
        case 'getall': {
            const result = await User.find().exec()
            const users = result.map(ele => {
                ele.name,
                ele.email
            })
            res.send({
                users
            }) 
        }
    }
} 