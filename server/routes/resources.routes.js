const express = require("express");
const router = express.Router();
let resources = require("../data/resources");

// simple middleware
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "Bearer admin-secret-token") return next();
  return res.status(403).json({ message: "Not allowed" });
};

// CREATE
router.post("/", isAdmin, (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  resources.push(newItem);
  res.json({ success: true, data: newItem });
});

// UPDATE
router.put("/:id", isAdmin, (req, res) => {
  resources = resources.map(r =>
    r.id === req.params.id ? { ...r, ...req.body } : r
  );
  res.json({ success: true });
});

// DELETE
router.delete("/:id", isAdmin, (req, res) => {
  resources = resources.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// 🔥 THIS WAS MISSING
module.exports = router;
