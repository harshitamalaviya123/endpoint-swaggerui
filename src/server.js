/**
 * Server Entry Point
 * Initializes environment configuration, connects to MongoDB, and boots the Express HTTP server.
 */
require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Bootstrap backend server securely ensuring persistence availability
const startServer = async () => {
  // Await database availability prior to accepting web traffic
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode`);
    console.log(`🔗 Listening on port: http://localhost:${PORT}`);
    console.log(`📁 Contacts Endpoint: http://localhost:${PORT}/api/contacts`);
    console.log(`=========================================`);
  });
};

startServer();

// Handle unhandled promise rejections gracefully
process.on("unhandledRejection", (err) => {
  console.error("CRITICAL: Unhandled Rejection detected. Shutting down gracefully...", err);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown handling for termination signals
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing HTTP server gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
