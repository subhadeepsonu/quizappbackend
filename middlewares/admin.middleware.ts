import {NextFunction, Request ,Response } from "express";
import jwt from "jsonwebtoken";
export async function adminmiddleware(req: Request, res: Response, next: NextFunction) {
    try {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    const check:any = jwt.verify(token, process.env.secret!);
    const decoded:any = jwt.decode(token);
    if (!decoded || decoded.role !== "admin") {
        return res.status(401).send("Unauthorized");
    }
    next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
    
}