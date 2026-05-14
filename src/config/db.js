/**
 * Database Configuration
 * Establishes and manages the connection lifecycle to MongoDB using Mongoose.
 */
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Best practices standard configurations are automatically used by modern Mongoose drivers
    });

    console.log(`=========================================`);
    console.log(`🗄️  MongoDB Connected successfully`);
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`=========================================`);
  } catch (error) {
    console.error(`❌ CRITICAL: MongoDB Connection Error: ${error.message}`);
    // Exit process with failure code if initial database connection cannot be established
    process.exit(1);
  }
};

// Listeners for database connection state changes
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB connection lost / disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.info("🔄 MongoDB reconnected successfully.");
});

module.exports = connectDB;
