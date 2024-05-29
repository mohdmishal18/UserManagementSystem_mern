import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import adminRoutes from './routes/adminRoute.js'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000
connectDB();
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/api/users' , userRoutes)


app.get('/', (req, res) => res.send("server is ready !!"));

app.use(notFound)
app.use(errorHandler)

app.listen(port , () => console.log(`Server is on http://localhost:${port}/`))
