const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Import routes
const chatRoutes = require("./routes/chat.routes");
const contactRoutes = require("./routes/contact.routes");
const resourcesRoutes = require("./routes/resources.routes");
const newsRoutes = require("./routes/news.routes");
const authRoutes = require("./routes/auth.routes");
const rankingRoutes = require("./routes/ranking.routes");

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api", contactRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ranking", rankingRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Kill the process using it first:`);
    console.error(`   Run: lsof -ti :${PORT} | xargs kill -9`);
    process.exit(1); // Exit so nodemon can cleanly restart after port is freed
  } else {
    throw err;
  }
});
