import { Request ,Response } from "express";
import { addquestiontoQuizschema, createQuizschema, editQuizschema } from "../schema/quiz.schema";
import prisma from "../db";
export async function createQuiz(req: Request, res: Response) {
    try {
        const data = req.body;
        const check = createQuizschema.safeParse(data);
        if(!check.success){
            return res.json({
                success:false,
                message:check.error.errors[0].message
            })
        }
        const response = await prisma.quiz.create({
            data:{
                name:data.name,
                categoryid:data.categoryid,
                image:data.image,
                difficulty:data.difficulty
            }
        })
        return res.json({
            success:true,
            message:"Quiz created successfully",
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getAllQuiz(req: Request, res: Response) {
    try {
        const data = req.body;
        if(!data.categoryid && !data.name){
            const response = await prisma.quiz.findMany({
                include:{
                    category:true,
                    _count:{
                        select:{
                            question:true
                        }
                    }
                }
            })
            return res.json({
                success:true,
                data:response
            })
        }
        let filter:any ={}
        if(data.categoryid){
            filter.categoryid = data.categoryid
        }
        if(data.name){
            filter.name = {
                contains:data.name,
                mode:"insensitive"
            }
        }
        const response = await prisma.quiz.findMany({
            include:{
                category:true,
                _count:{
                    select:{
                        question:true
                    }
                }

            },
            where:filter

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
export async function getQuizbyid(req: Request, res: Response) {
    try {
        const quizid = req.params.quizid;
        const response = await prisma.quiz.findUnique({
            where:{
                id:quizid
            }
        })
        if(!response){
            return res.json({
                success:false,
                message:"Quiz not found"
            })
        }
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
export async function editQuiz(req: Request, res: Response) {
    try {
        const quizid = req.params.quizid;
        const data = req.body;
        const check = editQuizschema.safeParse(data);
        if(!check.success){
            return res.json({
                success:false,
                message:check.error.errors[0].message
            })
        }
        const response = await prisma.quiz.update({
            where:{
                id:quizid
            },
            data:{
                name:data.name,
                categoryid:data.categoryid,
                image:data.image,
                difficulty:data.difficulty
            }
        })
        return res.json({
            success:true,
            message:"Quiz updated successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function deleteQuiz(req: Request, res: Response) {
    try {
        const quizid = req.params.quizid;
        const response = await prisma.quiz.delete({
            where:{
                id:quizid
            }
        })
        return res.json({
            success:true,
            message:"Quiz deleted successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getQuizbycategory(req: Request, res: Response) {
    try {
        const categoryid = req.params.categoryid;
        const response = await prisma.quiz.findMany({
            where:{
                categoryid:categoryid,

            },
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
export async function addQuestiontoQuiz(req: Request, res: Response) {
    try {
        const quizid = req.params.quizid;
        const data = req.body;
        const checkschema = addquestiontoQuizschema.safeParse(data);
        if(!checkschema.success){
            return res.json({
                success:false,
                message:checkschema.error.errors[0].message
            })
        }
        const quiz = await prisma.quiz.findUnique({
            where:{
                id:quizid
            }
        })
        if(!quiz){
            return res.json({
                success:false,
                message:"Quiz not found"
            })
        }
        const question = await prisma.question.findUnique({
            where:{
                id:data.questionid
            }
        })
        if(!question){
            return res.json({
                success:false,
                message:"Question not found"
            })
        }
        const response = await prisma.quiz.update({
            where:{
                id:quizid
            },
            data:{
                question:{
                    connect:{
                        id:data.questionid
                    }
                }
            }
        })
        return res.json({
            success:true,
            message:"Question added to quiz successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function removeQuestionfromQuiz(req: Request, res: Response) {
    try {
        const quizid = req.params.quizid;
        const data = req.body;
        const checkschema = addquestiontoQuizschema.safeParse(data);
        if(!checkschema.success){
            return res.json({
                success:false,
                message:checkschema.error.errors[0].message
            })
        }
        const quiz = await prisma.quiz.findUnique({
            where:{
                id:quizid
            }
        })
        if(!quiz){
            return res.json({
                success:false,
                message:"Quiz not found"
            })
        }
        const question = await prisma.question.findUnique({
            where:{
                id:data.questionid
            }
        })
        if(!question){
            return res.json({
                success:false,
                message:"Question not found"
            })
        }
        const response = await prisma.quiz.update({
            where:{
                id:quizid
            },
            data:{
                question:{
                    disconnect:{
                        id:data.questionid
                    }
                }
            }
        })
        return res.json({
            success:true,
            message:"Question removed from quiz successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getPopularQuiz(req: Request, res: Response) {
    try {
        const response = await prisma.quiz.findMany({
            take:4
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