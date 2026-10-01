import express from "express";
import { renderIndex, renderAdd, addEmployee, renderEdit, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeById } from "../controllers/employee.controller.js";

const router = express.Router();
router.get("/", renderIndex);
router.get("/employees", renderIndex);
router.get("/employees/add", renderAdd);
router.post("/employees/add", addEmployee);
router.get("/employees/edit/:id", renderEdit);
router.post("/employees/edit/:id", updateEmployee);
router.post("/employees/delete/:id", deleteEmployee);
router.get("/api/employees", getAllEmployees);
router.get("/api/employees/:id", getEmployeeById);
export default router;
