import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { envs } from "../env.js";
import { User } from "../db/models.js";
import { UserType } from "../db/schemas/user.js";
import { CustomRequest } from "../types.js";

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user_name = req.cookies.user_name
    if (user_name) {
        req.user_name = user_name
        next()
    }
    const authToken = req.headers.authorization
    if (!authToken) {
        res.sendStatus(403).json({
            message: 'Unauthorized'
        })
    }

    const payload = jwt.verify(authToken, envs.AUTH_SECRET) as UserType
    const user = await User.findOne({
        email: { $eq: payload.email }
    }).exec()

    if (!user) {
        res.sendStatus(403).json({
            message: 'Unauthorized'
        })
    }

    // This is to maintian session for the current user, preventing repeated calls to DB for authentication
    res.cookie('user_name', user.name, { maxAge: 900000, httpOnly: true })
    req.user_name = user.name

    next()
}