import express from "express"
import { addQuestiontoQuiz, createQuiz, deleteQuiz, editQuiz, getAllQuiz, getPopularQuiz, getQuizbycategory, getQuizbyid, removeQuestionfromQuiz } from "../controllers/quiz.controller"
import { adminmiddleware } from "../middlewares/admin.middleware"
import { usermiddleware } from "../middlewares/user.middleware"
export const quizRouter = express.Router()
quizRouter.post('/create',adminmiddleware,createQuiz)
quizRouter.post('/filter',usermiddleware,getAllQuiz)
quizRouter.get('/qid/:quizid',usermiddleware,getQuizbyid)
quizRouter.get('/catid/:category',usermiddleware,getQuizbycategory)
quizRouter.put('/edit/:quizid',adminmiddleware,editQuiz)
quizRouter.delete('/delete/:quizid',adminmiddleware,deleteQuiz)
quizRouter.post('/addquestion/:quizid',adminmiddleware,addQuestiontoQuiz)
quizRouter.delete('/removequestion/:quizid',adminmiddleware,removeQuestionfromQuiz)
quizRouter.get("/popular",usermiddleware,getPopularQuiz)