import dotenv from "dotenv";
dotenv.config();

export const API_ID = process.env.TG_API_ID!;
export const API_HASH = process.env.TG_API_HASH!;
export const STRING_SESSION = process.env.STRING_SESSION!;
export const MONGO_URI = process.env.MONGO_URI!;