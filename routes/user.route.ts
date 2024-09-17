import express from "express"
import { getuser, login, logout, register } from "../controllers/user.controller"
import { usermiddleware } from "../middlewares/user.middleware"
import { adminmiddleware } from "../middlewares/admin.middleware"
export const userRouter = express.Router()
userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/logout',logout)
userRouter.get('/me',usermiddleware)
userRouter.post("/",usermiddleware,getuser)