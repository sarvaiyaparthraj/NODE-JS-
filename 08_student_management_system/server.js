
import express from "express";

import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello from my new server",
  });
});

// Undefined Routes
app.use((req, res, next) => {
  return next(new HttpError("Request route not found", 404));
});

// Centralized Error Handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500);

  res.json({
    message: error.message || "Internal server error",
  });
});

const port = 5000;

async function StartServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect DB");
    }

    app.listen(port, (error) => {
      if (error) {
        return console.log(error.message);
      }

      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

StartServer();
