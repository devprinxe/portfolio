import express from "express";
import { register, login, logout } from "../controller/auth_controller.js";
import { registrationValidationRules, validateRegistration, validateLogin, loginValidationRules } from "../middleware/auth_validation.js"

const authRoutes = express.Router();

authRoutes.post("/register", registrationValidationRules, validateRegistration, register);
authRoutes.post("/login", loginValidationRules, validateLogin, login);
authRoutes.post("/logout", logout);

export default authRoutes;