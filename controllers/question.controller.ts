import { Request ,Response } from "express";
import { checkanswerSchema, createquestionSchema, editQuestionSchema } from "../schema/question.schema";
import prisma from "../db";
export async function createQuestion(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = createquestionSchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error
            })
        }
        const response = await prisma.question.create({
            data:{
                answer:checkschema.data.answer,
                categoryid:checkschema.data.categoryid,
                difficulty:checkschema.data.difficulty,
                image:checkschema.data.image,
                question:checkschema.data.question

            }
        })
        return res.status(201).json({
            success:true,
            message:"Question created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getQuestion(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await prisma.question.findUnique({
            where:{
                id:id
            }
        })
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        return res.status(200).json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function editQuestion(req: Request, res: Response) {
    try {
        const data = req.body;
        const id = req.params.id;
        const checkschema = editQuestionSchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error
            })
        }
        const response = await prisma.question.update({
            where:{
                id:id
            },
            data:{
                answer:checkschema.data.answer,
                categoryid:checkschema.data.categoryid,
                difficulty:checkschema.data.difficulty,
                image:checkschema.data.image,
                question:checkschema.data.question
            }
        })
        return res.status(200).json({
            success:true,
            message:"Question updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function deleteQuestion(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await prisma.question.delete({
            where:{
                id:id
            }
        })
        return res.status(200).json({
            success:true,
            message:"Question deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getQuestionbycategory(req: Request, res: Response) {
    try {
        const category = req.params.category;
        const response = await prisma.question.findMany({
            where:{
                categoryid:category
            },
            include:{
                category:{
                    
                }
            }
        })
        return res.status(200).json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function checkanswer(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const checkschema = checkanswerSchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error
            })
        }
        const response = await prisma.question.findUnique({
            where:{
                id:id
            }
        })
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        if(response.answer === checkschema.data.answer){
            return res.status(200).json({
                success:true,
                message:"Correct answer"
            })
        }
        return res.status(200).json({
            success:false,
            message:"Incorrect answer"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getAllQuestions(req: Request, res: Response) {
    try {
        const response = await prisma.question.findMany({
            include:{
                category:true
            }
        })
        return res.status(200).json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}