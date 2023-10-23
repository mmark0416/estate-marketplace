import "dotenv/config";

import express from "express";

//db
import connectDB from "./db/connectDB.js";

const app = express();

const port = process.env.PORT || 3000;

try {
  app.listen(port, async () => {
    await connectDB(process.env.MONGO_URL);
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
