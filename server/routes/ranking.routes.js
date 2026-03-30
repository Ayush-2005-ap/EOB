const express = require("express");
const router = express.Router();
const StateRanking = require("../models/StateRanking");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// GET ALL (Public)
router.get("/", async (req, res) => {
  try {
    const states = await StateRanking.find().sort({ rankNumber: 1 });
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE BY SLUG (Public)
router.get("/:slug", async (req, res) => {
  try {
    const state = await StateRanking.findOne({ slug: req.params.slug });
    if (!state) return res.status(404).json({ message: "Not found" });
    res.json(state);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (Admin Only)
router.put("/:slug", authenticateToken, isAdmin, async (req, res) => {
  try {
    const updated = await StateRanking.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, lastUpdatedBy: req.user.id },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
