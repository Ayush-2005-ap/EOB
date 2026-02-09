const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat.routes");
const contactRoutes = require("./routes/contact.routes");
const resourcesRoutes = require("./routes/resources.routes");
const newsRoutes = require("./routes/news.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api", contactRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = 5050; // SAFE PORT (no macOS conflict)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
