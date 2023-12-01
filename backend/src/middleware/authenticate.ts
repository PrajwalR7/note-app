import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { envs } from "../env.js";
import { User } from "../db/models.js";
import { UserType } from "../db/schemas/user.js";
import { CustomRequest } from "../types.js";

const TOKEN_EXPIRED_ERROR = 'TokenExpiredError'

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (req.cookies && req.cookies.user_name) {
            req.user_name = req.cookies.user_name
            next()
        }
        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }
    
        const payload = jwt.verify(authToken, envs.AUTH_SECRET) as UserType
        const user = await User.findOne({
            email: { $eq: payload.email }
        }).exec()
        if (!user) {
            console.log('returning unauth')
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        // This is to maintian session for the current user, preventing repeated calls to DB for authentication
        res.cookie('user_name', user.name, { maxAge: 900000, httpOnly: true })
        req.user_name = user.name
        next()
    } catch (e) {
        if ((e as Error).name === TOKEN_EXPIRED_ERROR) {
            console.log()
            return res.status(200).json({
                error: TOKEN_EXPIRED_ERROR
            })
        }
        return res.status(403).json({
            error: (e as Error).message
        })
    }
}