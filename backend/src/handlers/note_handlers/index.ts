import { Response } from "express";
import { CustomRequest } from "../../types.js";
import { getHandler } from "./getHandler.js";
import { deleteHandler } from "./deleteHandler.js";
import { updateHandler } from "./updateHandler.js";
import { postHandler } from "./postHandler.js";

export const noteHandler = async (req: CustomRequest, res: Response) => {
    try {
        switch(req.method) {
            case 'GET': {
                return await getHandler(req, res)
            }
            case 'POST': {
                return await postHandler(req, res)
            }
            case 'DELETE': {
                return await deleteHandler(req, res)
            }
            case 'PUT': {
                return await updateHandler(req, res)
            }
            default: {
                return res.send({
                    message: 'Required path is not present',
                    status: 404
                })
            }
        }
    } catch(e) {
        console.log(e)
        return res.send({
            message: 'Something went wrong',
            server_error_message: (e as Error).message,
            status: 500
        })
    } 
}