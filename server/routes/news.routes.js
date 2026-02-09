const express = require("express");
const router = express.Router();
const newsData = require("../data/news");

// GET ALL NEWS
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: newsData,
  });
});

// GET SINGLE NEWS
router.get("/:id", (req, res) => {
  const item = newsData.find(n => n.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "News not found",
    });
  }

  res.json({
    success: true,
    data: item,
  });
});

module.exports = router;
