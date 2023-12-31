import { NextFunction, Request, Response } from "express";

export const handleCors = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
}