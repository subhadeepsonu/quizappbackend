import z from "zod"
export const addflashcardSchema = z.object({
    question:z.string().min(1),
    answer:z.string().min(1),
    discription:z.string().min(1),
    categoryid:z.string().min(1),
})
export const editflashcardSchema = z.object({
    question:z.string().min(1),
    answer:z.string().min(1),
    discription:z.string().min(1),
    categoryid:z.string().min(1),
})