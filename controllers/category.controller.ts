import { Request ,Response } from "express";
import { createCategorySchema, updateCategorySchema } from "../schema/category.schema";
import prisma from "../db";
export async function createcategory(req: Request, res: Response) {
   try {
    const data = req.body;
    const checkschema = createCategorySchema.safeParse(data);
    if(!checkschema.success){
        return res.status(400).json({
            success:false,
            message:checkschema.error
        })
    }
    const response = await prisma.category.create({
        data:{
            name:checkschema.data.name
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
export async function getcategory(req: Request, res: Response) {
    try {
        const response = await prisma.category.findMany();
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

export async function editcategory(req: Request, res: Response) {
    try {
        const data = req.body;
        const checkschema = updateCategorySchema.safeParse(data);
        if(!checkschema.success){
            return res.status(400).json({
                success:false,
                message:checkschema.error
            })
        }
        const response = await prisma.category.update({
            where:{
                id:req.params.id
            },
            data:{
                name:checkschema.data.name
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
export async function deletecategory(req: Request, res: Response) {
        try {
            const response = await prisma.category.delete({
                where:{
                    id:req.params.id
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
