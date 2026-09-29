
import mongoose from "mongoose";

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);

        return true;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export default connectDB;

