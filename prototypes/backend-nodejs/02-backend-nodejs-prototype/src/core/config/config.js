import dotenv from 'dotenv';
import DB_CLIENTS from './db-clients.js';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  dbClient: process.env.DB_CLIENT || DB_CLIENTS.MOCK,
};
