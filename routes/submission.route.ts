import express from "express"
import { createSubmission, getSubmission, getSubmissionbyquizid } from "../controllers/submission.controller"
import { usermiddleware } from "../middlewares/user.middleware"
export const submissionRouter = express.Router()
submissionRouter.post('/create',usermiddleware,createSubmission)
submissionRouter.get('/:id',usermiddleware,getSubmission)
submissionRouter.get('/submission/:quizid',usermiddleware,getSubmissionbyquizid)