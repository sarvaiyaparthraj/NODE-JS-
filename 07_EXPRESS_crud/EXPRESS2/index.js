import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use(express.json());

const tasksList = [
  {
    id: 1,
    task: "LEARN JAVASCRIPT",
    description: "Practice Array Methods",
  },
  {
    id: 2,
    task: "LEARN NODE.JS",
    description: "Practice File System Module",
  },
  {
    id: 3,
    task: "LEARN EXPRESS.JS",
    description: "Practice Routes and Middleware",
  },
  {
    id: 4,
    task: "LEARN TYPESCRIPT",
    description: "Practice Types and Interfaces",
  },
  {
    id: 5,
    task: "LEARN MONGODB",
    description: "Practice Database Queries",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Express Crud",
  });
});

app.get("/taskList", (req, res) => {
  if (tasksList.length === 0) {
    return res.status(200).json({
      message: "No task available",
    });
  }

  res.status(200).json({
    message: "Task data fetched successfully",
    tasksList,
  });
});

app.post("/addTaskList", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new httpError("No taskList data found", 400));
  }

  const newTask = {
    id: tasksList.length + 1,
    task,
    description,
  };

  tasksList.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task added successfully",
    newTask,
  });
});

app.use((req, res, next) => {
  return next(new httpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong. Please try again later",
  });
});

const port = 5100;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running on port ${port}`);
});
