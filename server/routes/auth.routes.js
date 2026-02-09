const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // simple demo auth (later replace with DB)
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: true,
      token: "admin-secret-token",
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

module.exports = router;
