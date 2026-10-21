import jwt from "jsonwebtoken";
import User from "../model/userdata.js";
import HttpError from "./httpError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new HttpError("Authorization header must use Bearer token", 401));
    }

    const token = authHeader.slice(7).trim();
    if (!token) return next(new HttpError("Authentication token is required", 401));
    if (!process.env.JWT_SECRET) {
      return next(new HttpError("JWT_SECRET is not configured on the server", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) return next(new HttpError("Unauthorized access", 401));

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new HttpError(error.name === "TokenExpiredError" ? "Token has expired" : "Invalid authentication token", 401));
  }
};

export default auth;
