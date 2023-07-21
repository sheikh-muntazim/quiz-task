import express from 'express'
const app = express()
import userRouter from './routes/userRouter.js'
import connectDB from './db/connectDB.js'
import quizRouter from './routes/quizRouter.js'



const PORT =4000
const DBNAME="quiz"
const DBURL="mongodb://127.0.0.1"

app.use(express.json())
connectDB(DBURL,DBNAME)

app.use('/users',userRouter)
app.use('/quizes',quizRouter)


app.listen(PORT,()=>{
    console.log(`server started at port number ${PORT}`);
})