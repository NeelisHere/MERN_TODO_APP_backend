import express from 'express';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { connectDB } from './data/database.js';
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors'


config({
    path: './data/config.env'
})

const port = process.env.PORT
const dbName = 'tasksapi'

const app = express();
connectDB(dbName)

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json()) // parsing json data
app.use(cookieParser()) // for accessing cookies
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)
app.use(errorMiddleware)


app.get('/', (req, res) => {
    res.send('home')
})



app.listen(port, () => {
    console.log(`server listening on port: ${port}`)
})