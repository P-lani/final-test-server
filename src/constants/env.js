import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const CLIENT_VERSION = process.env.CLIENT_VERSION;

// REDIS
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_USERNAME = process.env.REDIS_USERNAME;
export const REDIS_USERPASS = process.env.REDIS_USERPASS;
