import express from "express";

import HttpError from "../middlewares/httpError.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  return next(new httpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error " });
});


const port=5000;