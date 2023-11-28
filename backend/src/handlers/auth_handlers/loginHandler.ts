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
    let filterQuery: Record<string, unknown>
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
    console.log(filterQuery)
    const userDetails = await User.findOne(filterQuery).exec()
    if (!userDetails) {
        return res.status(403).json({
            message: 'User details not found'
        })
    }
    console.log(userDetails)
    const isPasswordValid = compareSync(password, userDetails.password)
    console.log('isPasswordValid', isPasswordValid)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Incorrect password'
        })
    }
    const payload = {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        id: userDetails._id
    }
    const accessToken = jwt.sign(payload, envs.AUTH_SECRET, { expiresIn: '2 days' })
    return res.status(201).json({
        ...payload,
        accessToken
    })
}