import { Request, Response } from "express";

export const handleCors = (req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", 'localhost:5173')
    res.setHeader("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "DELETE"])
    res.setHeader("Access-Control-Allow-Headers", "*")

    return res.sendStatus(200)
}