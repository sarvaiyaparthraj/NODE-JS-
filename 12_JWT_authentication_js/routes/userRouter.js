import express from "express";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);
router.post("/login", userController.login);
router.get("/getAll", auth, userController.getAll);
router.get("/authLogin", auth, userController.authLogin);
router.post("/logout", auth, userController.logout);
router.delete("/deleteUser", auth, userController.deleteUser);

export default router;
