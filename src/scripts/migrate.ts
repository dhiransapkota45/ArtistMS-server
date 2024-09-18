import { Client } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';
import env from '../config/env';

const runSQLFile = async () => {
  const client = new Client({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT,
  });

  try {
    await client.connect();

    const sqlFilePath = path.join(__dirname, '../database/migrations/init.sql');

    const sql = readFileSync(sqlFilePath, 'utf8');
    await client.query(sql);
    console.log('SQL file executed successfully.');
  } catch (error) {
    console.error('Error executing SQL file:', error);
  } finally {
    await client.end();
  }
};

runSQLFile();
