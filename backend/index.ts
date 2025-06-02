import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import { authRouter } from './src/routes/auth.route.ts'


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)

// testing
app.get('/',(req: Request, res: Response)=>{
    res.send('hello world')
})


app.listen(process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
