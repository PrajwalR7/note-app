import mongoose from "mongoose"
import { envs } from "../env.js"
import { NextFunction, Request, Response } from "express"

export const dbConnect = async (req: Request, res: Response, next: NextFunction) => {
    mongoose.connect(`mongodb+srv://${envs.MONGO_USERNAME}:${encodeURIComponent(envs.MONGO_PASSWORD)}@cluster0.vfeqdvy.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('MongoDB connection success')
        next()
    })
    .catch((err) => {
        const erroObj = err as Error
        res.send({
            status: 500,
            message: erroObj.message,
            cause: erroObj.cause
        })
    })
}