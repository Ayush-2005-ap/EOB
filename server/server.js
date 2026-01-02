const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = 5050; // SAFE PORT (no macOS conflict)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
