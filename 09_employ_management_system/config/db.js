import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employee_management";
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
};

export default connectDB;
