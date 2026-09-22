import mongoose from "mongoose";

async function connectDB() {

    try {

        const connect = await mongoose.connect(
            "mongodb://127.0.0.1:27017/studentManagementSystem"
        );

        console.log("DB Connected");

        return connect;

    } catch (err) {

        console.log(err.message);
        throw err;

    }
}

export default connectDB;