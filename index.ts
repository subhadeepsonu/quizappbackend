import express from "express"
import { userRouter } from "./routes/user.route"
import { quizRouter } from "./routes/quiz.route"
import { submissionRouter } from "./routes/submission.route"
import { questionRouter } from "./routes/question.route"
import { categoryRouter } from "./routes/category.route"
import cookieParser from "cookie-parser"
import cors  from "cors"
import { flashcardRouter } from "./routes/flashcard.route"
const app = express()
const port = 3000
app.use(cookieParser())
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
app.use("/flashcards",flashcardRouter)
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})