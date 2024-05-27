import express from "express";
import DBconnection from "./database/db.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";
import { problemRouter } from "./routes/problemRoutes.js";

DBconnection();

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // specify the origin you want to allow
    credentials: true, // allow credentials
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", userRouter);
app.use("/problem", problemRouter);
// app.use("/submission", submissionRouter);
// app.use("/testcase", testcaseRouter);

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
