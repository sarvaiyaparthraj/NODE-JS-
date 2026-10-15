import mongoose from "mongoose";

const connectDB=async()=>
{
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        consol.log("db connected");

        return true;
        
    } catch (error) {

        console.log("db error ",error.message)
        
        return false;
    }
};

export default connectDB;