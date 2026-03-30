const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// GET ALL (Public)
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE (Public)
router.get("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "Not found" });
        res.json(resource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE (Admin Only)
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    const saved = await newResource.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE (Admin Only)
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (Admin Only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
