import { Request, Response } from "express";
import { User } from "../../db/models.js";
import jwt from 'jsonwebtoken'
import { envs } from "../../env.js";
import { compareSync } from 'bcrypt'

interface LoginUserDataType {
    email?: string,
    name?: string,
    password: string
}

export const loginHandler = async (req: Request, res: Response) => {
    const userData = req.body as LoginUserDataType

    const { email, name, password } = userData
    let filterQuery: Record<string, unknown> = {
        password: {$eq: password}
    }
    if (email) {
        filterQuery = {
            ...filterQuery,
            email: {$eq: email}
        }
    }
    if (name) {
        filterQuery = {
            ...filterQuery,
            name: {$eq: name}
        }
    }
    const userDetails = await User.findOne(filterQuery).exec()
    if (!userDetails) {
        return res.sendStatus(403).json({
            message: 'User details not found'
        })
    }

    const isPasswordValid = compareSync(password, userDetails.password)
    if (!isPasswordValid) {
        res.sendStatus(403).json({
            message: 'Incorrect password'
        })
    }

    const accessToken = jwt.sign(userDetails, envs.AUTH_SECRET, { expiresIn: '2 days' })
    return res.sendStatus(201).json({
        accessToken
    })
}