import { Pool } from 'pg';
import env from '../config/env';

export const connectToDatabase = async (): Promise<Pool> => {
  const pool = new Pool({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
  });

  try {
    await pool.query('SELECT 1');
    console.log('Connected to the database');
    return pool;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};