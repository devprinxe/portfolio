import express from "express";
import { register, login, logout } from "../controller/auth_controller.js";
import { registrationValidationRules, validateRegistration } from "../middleware/auth_validation.js"

const authRoutes = express.Router();

authRoutes.post("/register", registrationValidationRules, validateRegistration, register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;