import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const URI = process.env.DATABASE_CONNECTION

export default async function connect() {
    await mongoose.connect(`${URI}`)
};

