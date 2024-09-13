import express from "express"
import { login, logout, register } from "../controllers/user.controller"
import { usermiddleware } from "../middlewares/user.middleware"
export const userRouter = express.Router()
userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/logout',logout)
userRouter.get('/',usermiddleware)