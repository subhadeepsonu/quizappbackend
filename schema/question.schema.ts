import z from 'zod';
export const createquestionSchema = z.object({
    question:z.string().min(1),
    answer:z.string().min(1),
    categoryid:z.string().min(1),
    image:z.string().min(1),
    difficulty:z.enum(["easy","medium","hard"])
})
export const editQuestionSchema = z.object({
    question:z.string().min(1),
    answer:z.string().min(1),
    categoryid:z.string().min(1),
    image:z.string().min(1),
    difficulty:z.enum(["easy","medium","hard"])
})
export const checkanswerSchema = z.object({
    answer:z.string().min(1)
})
