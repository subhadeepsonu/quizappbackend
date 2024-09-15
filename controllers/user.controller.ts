import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schema/user.schema";

export async function me(req: Request, res: Response) {
    try {
        const data = req.body;
        const response = await prisma.user.findUnique({
            where: {
                id: data.id
            }
        });
        if (!response) {
            return res.json({ 
                success: false,
                message: "User does not exist"
            });
        }
        return res.json({
            success: true,
            message: response
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = loginSchema.safeParse(data);
        if (!checkschema.success) {
            return res.json({
                success: false,
                message: checkschema.error.message
            });
        }
        
        const checkuser = await prisma.user.findUnique({
            where: {
                email: checkschema.data.email
            }
        });
        
        if (!checkuser) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        const verify = bcrypt.compareSync(data.password, checkuser.password);
        if (!verify) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({id: checkuser.id, role: checkuser.role}, process.env.secret!);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            domain: "localhost" // Make sure this matches with logout
        });
        return res.json({
            success: true,
            token: token,
            id: checkuser.id,
            role: checkuser.role
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function register(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = registerSchema.safeParse(data);
        if (!checkschema.success) {
            return res.json({
                success: false,
                message: checkschema.error.message
            });
        }
        
        const checkuser = await prisma.user.findUnique({
            where: {
                email: checkschema.data.email
            }
        });
        
        if (checkuser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }
        const hash = bcrypt.hashSync(data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: checkschema.data.email,
                password: hash,
                role: "user",
                username: checkschema.data.username
            }
        });
        const token = jwt.sign({id: user.id, role: user.role}, process.env.secret!);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            domain: "localhost" // Make sure this matches with logout
        });
        return res.json({
            success: true,
            token: token,
            id: user.id,
            role: user.role
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        res.cookie("token","haha", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            domain: "localhost", // Make sure this matches with logout
            expires: new Date(0)
        });
        
        console.log("Logged out");
        return res.json({
            success: true,
            message: "Logged out"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
}