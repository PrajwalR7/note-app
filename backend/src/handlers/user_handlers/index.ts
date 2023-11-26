import { Request, Response, request } from "express";
import { deleteHandler } from "./deleteHandler.js";
import { getHandler } from "./getHandler.js";

export const userHandler = async (req: Request, res: Response) => {
    try {
        switch (req.method) {
            case 'GET': {
                await getHandler(req, res)
                break
            }
            case 'DELETE': {
                await deleteHandler(req, res)
                break
            }
            default: {
                res.send({
                    message: 'Required path is not present',
                    status: 404
                })
            }
        }
    } catch(e) {
        res.send({
            message: 'Something went wrong',
            server_error_message: (e as Error).message,
            status: 500
        })
    }
}