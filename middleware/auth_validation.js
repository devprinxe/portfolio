import { body, validationResult } from "express-validator";


const registrationValidationRules = [
    body("username").notEmpty().withMessage('Username is required'),
    body("email").notEmpty().isEmail().withMessage('Valid email is required'),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength(6).withMessage("Password should be atleast 6 character"),
];

// Validate the request data and return the validation result
const validateRegistration = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const loginValidationRules = [
    body("username").notEmpty().withMessage('Username is required'),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength(6).withMessage("Password should be atleast 6 character"),
];

// Validate the request data and return the validation result
const validateLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export { registrationValidationRules, validateRegistration, loginValidationRules, validateLogin };