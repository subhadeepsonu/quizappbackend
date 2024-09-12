import express from "express"
import { createSubmission, getSubmission, getSubmissionbyquizid } from "../controllers/submission.controller"
import { adminmiddleware } from "../middlewares/admin.middleware"
import { usermiddleware } from "../middlewares/user.middleware"
export const submissionRouter = express.Router()
submissionRouter.post('/create',adminmiddleware,createSubmission)
submissionRouter.get('/submission',usermiddleware,getSubmission)
submissionRouter.get('/submission/:quizid',usermiddleware,getSubmissionbyquizid)