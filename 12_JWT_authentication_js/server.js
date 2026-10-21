import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import HttpError from "./middleware/httpError.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "JWT Authentication API is running" });
});

app.use("/user", userRouter);

app.use((req, res, next) => {
  next(new HttpError("Route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  const connected = await connectDB();
  if (!connected) {
    console.error("Server not started because MongoDB connection failed. Check MONGODB_URI in .env.");
    process.exitCode = 1;
    return;
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
