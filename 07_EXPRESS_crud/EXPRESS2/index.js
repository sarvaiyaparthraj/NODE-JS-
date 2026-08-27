import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();

app.use(express.json());

const taskList = [
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

// GET /
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express Crud",
  });
});

// GET TASK LIST
app.get("/taskList", (req, res, next) => {
  try {
    if (taskList.length === 0) {
      return res.status(200).json({
        message: "No task available",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task data fetched successfully",
      taskList,
    });
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }
});

// POST - ADD TASK
app.post("/addTaskList", (req, res, next) => {
  try {
    const { task, description } = req.body;

    if (!task || !description) {
      return next(
        new httpError("Task and description are required", 400)
      );
    }

    const newTask = {
      id: taskList.length + 1,
      task,
      description,
    };

    taskList.push(newTask);

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      newTask,
    });
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }
});

// PATCH - UPDATE TASK
app.patch("/taskUpdate/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, description } = req.body;

    const dataTask = taskList.find(
      (t) => t.id === Number(id)
    );

    // Task ID not found
    if (dataTask === undefined) {
      return next(
        new httpError("Task not found", 404)
      );
    }

    // Nothing provided for update
    if (task === undefined && description === undefined) {
      return next(
        new httpError(
          "Task or description data is required",
          400
        )
      );
    }

    // Update task
    if (task !== undefined) {
      dataTask.task = task;
    }

    // Update description
    if (description !== undefined) {
      dataTask.description = description;
    }

    res.status(200).json({
      success: true,
      message: "Task data updated successfully",
      dataTask,
    });
  } catch (err) {
    return next(
      new httpError("Something went wrong", 500)
    );
  }
});

// 404 MIDDLEWARE
app.use((req, res, next) => {
  return next(
    new httpError("Requested route not found", 404)
  );
});

// ERROR HANDLER
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message:
      error.message ||
      "Something went wrong. Please try again later",
  });
});

// SERVER
const port = 5100;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running on port ${port}`);
});