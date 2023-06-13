import express from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controller/auth_controller.js";
import {
  registrationValidationRules,
  validateRegistration,
  validateLogin,
  loginValidationRules,
} from "../middleware/auth_validation.js";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  registrationValidationRules,
  validateRegistration,
  register
);
authRoutes.post("/login", loginValidationRules, validateLogin, login);
authRoutes.get("/profile", profile);
authRoutes.post("/logout", logout);

export default authRoutes;
