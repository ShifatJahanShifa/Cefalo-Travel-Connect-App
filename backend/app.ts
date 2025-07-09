// src/app.ts
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { authRouter } from './src/routes/auth.route.ts'
import { userRouter } from './src/routes/user.route.ts'
import { postRouter } from './src/routes/post.route.ts' 
import { accommodationRouter } from './src/routes/accommodation.route.ts'
import { placeRouter } from './src/routes/place.route.ts'
import { transportRouter } from './src/routes/transport.route.ts'
import { resrestaurantRouter } from './src/routes/restaurant.route.ts'
import { wishlistRouter } from './src/routes/wishlist.route.ts'
import { travelPlanRouter } from './src/routes/travelplan.route.ts'
import { notificationRouter } from './src/routes/notification.route.ts'
import { proximityRouter } from './src/routes/proximity.route.ts'
import { globalErrorHandler } from './src/utils/globalErrorHandler.ts'


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[INCOMING REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/accommodations', accommodationRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/transports', transportRouter);
app.use('/api/v1/restaurants', resrestaurantRouter);
app.use('/api/v1/wishlists', wishlistRouter);
app.use('/api/v1/travelplans', travelPlanRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/proximity', proximityRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(globalErrorHandler);

export default app;
