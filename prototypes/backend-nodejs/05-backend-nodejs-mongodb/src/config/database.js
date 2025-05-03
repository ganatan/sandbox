import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'backend_node_javascript';
let db = null;

const connectMongoDB = async () => {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Connected to MongoDB: ${dbName}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw new Error('Failed to connect to MongoDB');
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectMongoDB() first.');
  }

  return db;
};

export { connectMongoDB, getDb };
