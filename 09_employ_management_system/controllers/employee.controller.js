import mongoose from "mongoose";
import Employee from "../models/employee.model.js";

const renderIndex = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render("employees/index", { employees, error: null });
  } catch (error) { next(error); }
};

const renderAdd = (req, res) => res.render("employees/add", { error: null, employee: {} });

const addEmployee = async (req, res, next) => {
  try {
    await Employee.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error.code === 11000) return res.status(409).render("employees/add", { error: "Email already exists", employee: req.body });
    res.status(400).render("employees/add", { error: error.message, employee: req.body });
  }
};

const renderEdit = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).render("error", { message: "Invalid employee ID" });
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).render("error", { message: "Employee not found" });
    res.render("employees/edit", { employee, error: null });
  } catch (error) { next(error); }
};

const updateEmployee = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).render("error", { message: "Invalid employee ID" });
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) return res.status(404).render("error", { message: "Employee not found" });
    res.redirect("/");
  } catch (error) {
    if (error.code === 11000) return res.status(409).render("employees/edit", { error: "Email already exists", employee: { ...req.body, _id: req.params.id } });
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).render("error", { message: "Invalid employee ID" });
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).render("error", { message: "Employee not found" });
    res.redirect("/");
  } catch (error) { next(error); }
};

const getAllEmployees = async (req, res, next) => {
  try { res.json(await Employee.find().sort({ createdAt: -1 })); } catch (error) { next(error); }
};

const getEmployeeById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid employee ID" });
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) { next(error); }
};

export { renderIndex, renderAdd, addEmployee, renderEdit, updateEmployee, deleteEmployee, getAllEmployees, getEmployeeById };
