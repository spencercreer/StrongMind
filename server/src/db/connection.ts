import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const url = process.env.MONGODB || "mongodb://0.0.0.0:27017/strongmind";

mongoose
  .connect(url, {
    ssl: process.env.NODE_ENV === "production" ? true : false,
  })
  .catch((err: unknown) => {
    throw err;
  });

export default mongoose.connection;
