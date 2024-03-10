import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || ''
export const redis = new Redis(REDIS_URL);
