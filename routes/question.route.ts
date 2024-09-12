import express from "express"
import { checkanswer, createQuestion, deleteQuestion, editQuestion, getQuestion, getQuestionbycategory } from "../controllers/question.controller"
import { adminmiddleware } from "../middlewares/admin.middleware"
import { usermiddleware } from "../middlewares/user.middleware"
export const questionRouter = express.Router()
questionRouter.post('/create',adminmiddleware,createQuestion)
questionRouter.get('/question/:id',usermiddleware,getQuestion)
questionRouter.put('/edit/:id',adminmiddleware,editQuestion)
questionRouter.delete('/delete/:id',adminmiddleware,deleteQuestion)
questionRouter.get('/question/:category',usermiddleware,getQuestionbycategory)
questionRouter.post('/checkanswer/:id',usermiddleware,checkanswer)
