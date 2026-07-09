const mongoose = require("mongoose");

const RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 5;

const connectDB = async (retries = MAX_RETRIES) => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eodb_initiative",
      { serverSelectionTimeoutMS: 8000 }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);

    if (retries > 0) {
      console.log(`🔄 Retrying in ${RETRY_DELAY_MS / 1000}s... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1), RETRY_DELAY_MS);
    } else {
      console.error("💀 All MongoDB connection attempts failed. Server will stay up but DB features won't work.");
      console.error("👉 Fix: Go to MongoDB Atlas → Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0)");
    }
    // ⚠️ NOT calling process.exit(1) — keeps the server alive so the port stays held
    // and nodemon doesn't trigger a restart loop causing EADDRINUSE
  }
};

module.exports = connectDB;
