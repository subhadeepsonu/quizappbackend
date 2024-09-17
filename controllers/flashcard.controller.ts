import { Request ,Response } from "express";
import prisma from "../db";
import { addflashcardSchema } from "../schema/flashcard.schema";
export async function getFlashcards(req:Request, res:Response) {
    try {
        const response = await prisma.flashCard.findMany({
            include:{
                category:true
            }
        })
        return res.json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function CreateFlashCard(req:Request, res:Response){
    try {
        const data = req.body;
        const check = addflashcardSchema.safeParse(data);
        if(!check.success){
            return res.status(400).json({
                success:false,
                message:check.error
            })
        }
        const response = await prisma.flashCard.create({
            data:{
                question:check.data.question,
                answer:check.data.answer,
                categoryid:check.data.categoryid,
                discription:check.data.discription
            }
        })
        return res.json({
            success:true,
            message:"Flashcard created successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function editFlashCard(req:Request, res:Response){
    try {
        const data = req.body;
        const check = addflashcardSchema.safeParse(data);
        if(!check.success){
            return res.status(400).json({
                success:false,
                message:check.error
            })
        }
        const response = await prisma.flashCard.update({
            where:{
                id:req.params.id
            },
            data:{
                question:check.data.question,
                answer:check.data.answer,
                categoryid:check.data.categoryid,
                discription:check.data.discription
            }
        })
        return res.json({
            success:true,
            message:"Flashcard updated successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function deleteFlashCard(req:Request,res:Response){
    try {
        const response = await prisma.flashCard.delete({
            where:{
                id:req.params.id,
                
            }
        })
        return res.json({
            success:true,
            message:"Flashcard deleted successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getFlashCardBycategory(req:Request,res:Response){
    const data = req.body;
    try {
        if(!data.categoryid && !data.question){
            const response = await prisma.flashCard.findMany({})
            return res.json({
                success:true,
                data:response
            })
        }
        let filter:any = {}
        if(data.categoryid){
            filter.categoryid = data.categoryid
        }
        if(data.question){
            filter.question = {
                contains:data.question,
                mode:"insensitive"
            }
        }
        const response = await prisma.flashCard.findMany({
            where:filter,
            
        })
        return res.json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}