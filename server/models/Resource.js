const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["research", "policy-briefs", "articles", "publications", "reports"] 
  },
  excerpt: { type: String },
  content: { type: String },
  pdf: { type: String }, // Path to the file or URL
  image: { type: String }, // For publications with covers
  date: { type: String },
  source: { type: String, default: "Centre for Civil Society" },
  readTime: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Resource", ResourceSchema);
