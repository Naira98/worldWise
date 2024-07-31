import dotenv from "dotenv";

dotenv.config();

export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const ACCESS_SECRET = process.env.ACCESS_SECRET
export const REFRESH_SECRET = process.env.REFRESH_SECRET
