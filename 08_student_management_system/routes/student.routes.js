

import express from "express";

import studentController from "../controller/student.controller.js";


const Router = express.Router();

Router.post("/add", studentController);

export default Router;