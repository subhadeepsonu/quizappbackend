import { Request ,Response } from "express";
import { createSubmissionschema } from "../schema/submission.schema";
import prisma from "../db";
export async function createSubmission(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = createSubmissionschema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error
            })
        }
        const response = await prisma.submissions.create({
            data:{
                maxscore:checkschema.data.maxscore,
                quizid:checkschema.data.quizid,
                score:checkschema.data.score,
                userid:checkschema.data.userid
            }
        })
        return res.status(201).json({
            success:true,
            message:"Submission created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function getSubmission(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await prisma.submissions.findMany({where:{
            userid:id
        }});
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
export async function getSubmissionbyquizid(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await prisma.submissions.findMany({where:{
            quizid:id,
            userid:data.userid
        }});
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