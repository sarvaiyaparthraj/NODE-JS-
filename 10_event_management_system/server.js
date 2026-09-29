
import express from "express";
import httpError from "./middleware/httpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json("event management system");
});

// Route not found
app.use((req, res, next) => {
    return next(new httpError("request routes not found", 404));
});

// Error handler
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    return res
        .status(error.statusCode || 500)
        .json({
            message: error.message || "internal server error"
        });
});

const port = 5000;

async function StartServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            return console.log("connect db is failed");
        }

        app.listen(port, (error) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(`server running on port ${port}`);
        });

    } catch (error) {
        console.log(error.message);
    }
}

StartServer();

