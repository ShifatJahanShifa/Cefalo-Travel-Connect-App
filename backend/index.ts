import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './src/routes/auth.route.ts'
import { userRouter } from './src/routes/user.route.ts'
import { postRouter } from './src/routes/post.route.ts' 
import { accommodationRouter } from './src/routes/accommodation.route.ts'
import { placeRouter } from './src/routes/place.route.ts'
import { transportRouter } from './src/routes/transport.route.ts'
import { resrestaurantRouter } from './src/routes/restaurant.route.ts'
import { wishlistRouter } from './src/routes/wishlist.route.ts'
import { dbClient } from './src/db/db.ts'
import { globalErrorHandler } from './src/utils/globalErrorHandler.ts'
import { swaggerUi, swaggerDocument } from './src/utils/swagger.ts'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postRouter)
app.use('/api/v1/accommodations',accommodationRouter)
app.use('/api/v1/places',placeRouter)
app.use('/api/v1/transports',transportRouter)
app.use('/api/v1/restaurants',resrestaurantRouter)
app.use('/api/v1/wishlists',wishlistRouter)

// testing
app.get('/',(req: Request, res: Response)=>{
    res.send('hello world')
})

app.use(globalErrorHandler)

async function startServer() {
    try {
        await dbClient.connect() 
        
        app.listen(process.env.PORT, () => {
          console.log(`Connected to server on port ${process.env.PORT}`)
          console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`)
        });
      

        process.on('SIGINT', async () => {
        console.log('Shutting down...')
        await dbClient.disconnect() 
        process.exit(0)
        });

  } catch (error) {
    console.error(' Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
