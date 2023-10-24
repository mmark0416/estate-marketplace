import "dotenv/config";
import "express-async-errors"
import cookieParser from "cookie-parser"

import express from "express";

//db
import connectDB from "./db/connectDB.js";

//Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

//middlewares
import errorHandler from './middleware/errorHandler.js'

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


//error middleware
app.use(errorHandler)


const port = process.env.PORT || 3000;

try {
  app.listen(port, async () => {
    await connectDB(process.env.MONGO_URL);
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
