const express = require("express");
const router = express.Router();
const { chatWithGemini } = require("../controller/chat.controller");

router.post("/", chatWithGemini);

module.exports = router;
