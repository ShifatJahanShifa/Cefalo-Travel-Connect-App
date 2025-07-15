import dotenv from 'dotenv';
import app from './app.ts';
import { dbClient } from './src/db/db.ts';

dotenv.config();

async function startServer() {
  try {
    await dbClient.connect();

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Connected to server on port ${process.env.PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      await dbClient.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
