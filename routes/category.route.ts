import express from "express"
import { createcategory, deletecategory, editcategory, getcategory } from "../controllers/category.controller"
import { usermiddleware } from "../middlewares/user.middleware"
import { adminmiddleware } from "../middlewares/admin.middleware"
export const categoryRouter = express.Router()
categoryRouter.get('/',usermiddleware,getcategory)
categoryRouter.post('/create',adminmiddleware,createcategory)
categoryRouter.put('/edit/:id',adminmiddleware,editcategory)
categoryRouter.delete('/delete/:id',adminmiddleware,deletecategory)
