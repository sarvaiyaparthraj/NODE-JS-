import mongoose from "mongoose";

async function connectDB() {

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sms");

    console.log("MongoDB connected successfully");

    return true;

  } catch (error) {

    console.log("MongoDB connection failed", error);

    return false;

  }

}


export default connectDB;