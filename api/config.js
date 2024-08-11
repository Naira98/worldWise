import dotenv from "dotenv";

dotenv.config();

export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_DATABASE = process.env.MONGO_DATABASE;
export const ACCESS_SECRET = process.env.ACCESS_SECRET
export const REFRESH_SECRET = process.env.REFRESH_SECRET
