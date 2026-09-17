import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import studentRoutes from "./routes/student.Routes.js"

const app = express();

app.use(express.json());

app.use("/student", studentRoutes);
app.get("/", (req, res) => {

    return res.json({
        message: "Student management system"
    });

});


// 404 middleware
app.use((req, res, next) => {

    return next(
        new httpError("Request not found", 404)
    );

});


// Error handling middleware
app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });

});


const port = 1000;


async function startServer() {

    try {

        const connect = await connectDB();

        if (!connect) {
            throw new Error("Failed to connect DB");
        }

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {

        console.log(err.message);

    }
}

startServer();
