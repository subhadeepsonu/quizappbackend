import z from 'zod';
export const createSubmissionschema =z.object({
        quizid: z.string().min(1),
        userid: z.string().min(1),
        score: z.number(),
        maxscore: z.number(),
})

