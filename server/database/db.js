import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Function to establish a connection to MongoDB
const DBconnection = async () => {
  const mongoDBURI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoDBURI);
    console.log("Connected to DataBase");
  } catch (error) {
    console.error("Error connecting to DataBase:", error);
  }
};

// Export the connection function
export default DBconnection;
