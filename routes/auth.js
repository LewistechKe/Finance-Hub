// Required Packages
const express = require("express");

// Define Router
const router = express.Router();

// Authentication Controller
const AuthController = require("../controllers/AuthController");

// @route POST api/auth/register
// @desc Register a new user
// @access Public
router.post("/register", AuthController.registerUser);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", AuthController.login);

// Export Router
module.exports = router;
