
Creer config/config.js

import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/mydb',
  logLevel: process.env.LOG_LEVEL || 'info'
};


Modifier server.js pour utiliser config.js

import app from './app.js';
import config from './config/config.js';

const server = app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});

export default server;
