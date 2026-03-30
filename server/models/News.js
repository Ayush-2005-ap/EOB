const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  link: { type: String },
  active: { type: Boolean, default: true },
  type: { 
    type: String, 
    enum: ["marquee", "latest-news", "hero-announcement"], 
    default: "latest-news" 
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("News", NewsSchema);
