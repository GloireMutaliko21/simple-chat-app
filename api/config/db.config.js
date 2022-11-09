import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = mongoose.connect(process.env.CONNECTION_STRING);

export default db;