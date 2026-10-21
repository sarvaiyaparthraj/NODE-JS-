import User from "../model/userdata.js";
import HttpError from "../middleware/httpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return next(new HttpError("name, email and password are required", 400));
    }
    if (password.length < 6) {
      return next(new HttpError("Password must be at least 6 characters", 400));
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return next(new HttpError("Email is already registered", 409));

    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    if (error.code === 11000) return next(new HttpError("Email is already registered", 409));
    if (error.name === "ValidationError") return next(new HttpError(error.message, 400));
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      total: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findByCredential(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    next(new HttpError(error.message, 400));
  }
};

const authLogin = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Authenticated successfully", user: req.user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((item) => item.token !== req.token);
    await user.save();
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token);
    await req.user.save();
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export default { add, getAll, login, authLogin, deleteUser, logout };
