const mongoose = require("mongoose");

const StateRankingSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g. "kerala"
  name: { type: String, required: true },
  rank: { type: String }, // e.g. "18 / 32"
  rankNumber: { type: Number },
  score: { type: String }, // percentage string
  status: { type: String }, // e.g. "Acceleration Required"
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("StateRanking", StateRankingSchema);
