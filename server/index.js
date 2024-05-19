import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/user.js";

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: "http://localhost:5173", // specify the origin you want to allow
  credentials: true, // allow credentials
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Parse incoming request bodies in middleware before your handlers, available under the req.body property
app.use(express.json());

app.use("/auth", UserRouter);

// MongoDB connection URL from environment variables
const mongoDBURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("Connected to User Cluster");
  })
  .catch((error) => {
    console.error("Error connecting to User Cluster:", error);
  });

// Set up a simple route to test the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define the port to run the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
