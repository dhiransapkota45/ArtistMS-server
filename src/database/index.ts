import { Pool } from 'pg';
import env from '../config/env';

export const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
});

export const connectToDatabase = async (): Promise<Pool> => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Connected to the database');
    return pool;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    console.log('Exiting the process');
    pool.end();
    console.log('Database connection closed');
    process.exit(1);
  }
};