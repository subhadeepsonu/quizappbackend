import express from "express"
import { userRouter } from "./routes/user.route"
import { quizRouter } from "./routes/quiz.route"
import { submissionRouter } from "./routes/submission.route"
import { questionRouter } from "./routes/question.route"
import { categoryRouter } from "./routes/category.route"
import cors  from "cors"
const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/user",userRouter)
app.use("/quiz",quizRouter)
app.use("/submissions",submissionRouter)
app.use("/questions",questionRouter)
app.use("/category",categoryRouter)
app.get("/",(req,res)=>{
    res.json({
        health:"check"
    })
})
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})