import express from "express"
import { login, logout, register } from "../controllers/user.controller"
export const userRouter = express.Router()
userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/logout',logout)