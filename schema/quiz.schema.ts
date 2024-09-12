import z from 'zod';
export const createQuizschema = z.object({
    name: z.string().min(1),
    categoryid: z.string().min(1),
    image: z.string().min(1),
    difficulty:z.enum(["easy","medium","hard"]), 
})
export const editQuizschema = z.object({
    name: z.string().min(1),
    categoryid: z.string().min(1),
    image: z.string().min(1),
    difficulty:z.enum(["easy","medium","hard"]),
})
export const addquestiontoQuizschema = z.object({
    questionid: z.string().min(1),
})
export const removequestionfromQuizschema = z.object({
    questionid: z.string().min(1),
})
