import app from './app.js';
import config from './config/config.js';
import { connectMongoDB } from './config/database.js';

const startServer = async () => {
  try {
    await connectMongoDB(); 

    const server = app.listen(config.port, () => {
      console.log(`✅ Server started at http://localhost:${config.port}`);
    });

    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
