import express from 'express';
export const groupRouter = express.Router();
groupRouter.get('/users', (req, res) => {
    res.json({ message: 'Route works!' });
});
