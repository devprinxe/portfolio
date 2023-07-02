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

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Authentication API
 *     consumes:
 *       - application/json
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
authRoutes.post(
  "/register",
  registrationValidationRules,
  validateRegistration,
  register
);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Authentication API
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
authRoutes.post("/login", loginValidationRules, validateLogin, login);
authRoutes.get("/profile", profile);
authRoutes.post("/logout", logout);

export default authRoutes;
