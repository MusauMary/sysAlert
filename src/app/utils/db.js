import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {      // checking currently open connections
      await mongoose.connect("mongodb://127.0.0.1:27017/alerts");
      console.log("MongoDB Connected...");
    } else {
      console.log("Using existing MongoDB connection...");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;