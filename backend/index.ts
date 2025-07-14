import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './src/routes/auth.route.ts'
import { userRouter } from './src/routes/user.route.ts'
import { postRouter } from './src/routes/post.route.ts' 
import { accommodationRouter } from './src/routes/accommodation.route.ts'
import { placeRouter } from './src/routes/place.route.ts'
import { transportRouter } from './src/routes/transport.route.ts'
import { restaurantRouter } from './src/routes/restaurant.route.ts'
import { wishlistRouter } from './src/routes/wishlist.route.ts'
import { travelPlanRouter } from './src/routes/travelplan.route.ts'
import { notificationRouter } from './src/routes/notification.route.ts'
import { proximityRouter } from './src/routes/proximity.route.ts'
import { dbClient } from './src/db/db.ts'
import { globalErrorHandler } from './src/utils/globalErrorHandler.ts'
import { swaggerUi, swaggerDocument } from './src/utils/swagger.ts'
import dotenv from 'dotenv'
import logger from './src/utils/logger.ts'


dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,               
  }))

  
app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[INCOMING REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postRouter)
app.use('/api/v1/accommodations',accommodationRouter)
app.use('/api/v1/places',placeRouter)
app.use('/api/v1/transports',transportRouter)
app.use('/api/v1/restaurants',restaurantRouter)
app.use('/api/v1/wishlists',wishlistRouter)
app.use('/api/v1/travelplans',travelPlanRouter)
app.use('/api/v1/notifications',notificationRouter)
app.use('/api/v1/proximity',proximityRouter)



app.use(globalErrorHandler)

async function startServer() {
  try {
    await dbClient.connect() 
    
    app.listen(process.env.PORT, () => {
      logger.info(`Connected to server on port ${process.env.PORT}`)
      logger.info(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`)
    });
  
    process.on('SIGINT', async () => {
      logger.warn('Shutting down...')
      await dbClient.disconnect() 
      process.exit(0)
    });
  } 
  catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1)
  }
}

startServer()
