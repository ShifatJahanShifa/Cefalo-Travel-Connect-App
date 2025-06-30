// src/app.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from "./src/routes/auth.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { postRouter } from "./src/routes/post.route.js";
import { accommodationRouter } from "./src/routes/accommodation.route.js";
import { placeRouter } from "./src/routes/place.route.js";
import { transportRouter } from "./src/routes/transport.route.js";
import { resrestaurantRouter } from "./src/routes/restaurant.route.js";
import { wishlistRouter } from "./src/routes/wishlist.route.js";
import { travelPlanRouter } from "./src/routes/travelplan.route.js";
import { notificationRouter } from "./src/routes/notification.route.js";
import { proximityRouter } from "./src/routes/proximity.route.js";
import { globalErrorHandler } from "./src/utils/globalErrorHandler.js";
// import { swaggerUi, swaggerDocument } from './utils/swagger';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
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
// Health check / test endpoint
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use(globalErrorHandler);
export default app;
