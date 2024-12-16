import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'


const PORT =process.env.PORT || 5000
const app = express()


// Middleware
app.use(express.json())
app.use(cors());

// Database Connection
await connectDB();

//Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.use('/api/payment', paymentRouter);  // Register the payment router

app.get('/',(req,res) => res.send("API Working fine..."))
//start server
app.listen(PORT,()=> console.log("Server running on port "+PORT));