import * as dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_NAME: process.env.DB_NAME,
};