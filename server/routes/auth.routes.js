const express = require("express");
const router = express.Router();
const { loginAdmin, getMe } = require("../controller/auth.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

// LOGIN (Public)
router.post("/login", loginAdmin);

// GET CURRENT USER (Protected)
router.get("/me", authenticateToken, getMe);

module.exports = router;
