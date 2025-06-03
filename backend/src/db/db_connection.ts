import { error } from "console";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const URI = process.env.DATABASE_CONNECTION;

export default async function connect() {
  try {
    await mongoose.connect(`${URI}`);
  } catch (error) {
    throw console.error(error);
  }
}
