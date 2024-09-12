import express from "express"
import { getcategory } from "../controllers/category.controller"
import { usermiddleware } from "../middlewares/user.middleware"
import { adminmiddleware } from "../middlewares/admin.middleware"
export const categoryRouter = express.Router()
categoryRouter.get('/',usermiddleware,getcategory)
categoryRouter.post('/create',adminmiddleware,getcategory)
categoryRouter.put('/edit/:id',adminmiddleware,getcategory)
categoryRouter.delete('/delete/:id',adminmiddleware,getcategory)
