import "dotenv/config";
import "express-async-errors"

import express from "express";
import path from "path";

//db
import connectDB from "./db/connectDB.js";

//Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

//middlewares
import errorHandler from './middleware/errorHandler.js'
import cookieParser from "cookie-parser"

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

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

//error middleware
app.use(errorHandler)

