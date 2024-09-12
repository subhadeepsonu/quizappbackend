import { NextFunction ,Request ,Response } from "express";
import jwt from "jsonwebtoken";
export async function usermiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const check:any = jwt.verify(token, process.env.secret!);
        next()
    } catch (error) {
        return res.status(401).send("Unauthorized");
        
    }
}