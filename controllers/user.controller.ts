import { Request ,Response } from "express";
import prisma from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schema/user.schema";
export async function me(req:Request,res:Response){
    try {
        const data = req.body
        const response = await prisma.user.findUnique({
            where:{
                id:data.id
            }
        })
        if(!response){
            return res.json({ 
                success:false,
                message:"User does not exist"
            })
        }
        return res.json({
            success:true,
            message:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function login(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = loginSchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error.message
            })
        }
        
        const checkuser = await prisma.user.findUnique({
            where:{
                email:checkschema.data.email
            }
        })
        
        if(!checkuser){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const verify = bcrypt.compareSync(data.password,checkuser.password);
        if(!verify){
            return res.json({
                success:false,
                message:"Invalid password"
            })
        }
        const token = jwt.sign({id:checkuser.id,role:checkuser.role},process.env.secret!);
        res.cookie("token",token,{
            httpOnly:true,
            // secure:true
        })
        console.log(token)
        return res.status(200).json({
            success:true,
            token:token
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function register(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = registerSchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error.message
            })
        }
        const checkuser = await prisma.user.findUnique({
            where:{
                email:checkschema.data.email
            }
        })
        if(checkuser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const hash = bcrypt.hashSync(data.password,10);
        const user = await prisma.user.create({
            data:{
                email:checkschema.data.email,
                password:hash,
                role:"user",
                username:checkschema.data.username
            }
        })
        const token = jwt.sign({id:user.id,role:user.role},process.env.secret!);
        res.cookie("token",token,{
            httpOnly:true,
            // secure:true
        })
        return res.status(200).json({
            success:true,
            message:token
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function logout(req: Request, res: Response) {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}