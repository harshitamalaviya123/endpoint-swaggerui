/**
 * Express Application Configuration
 * Sets up global middleware and registers base routes.
 */
const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const { swaggerUi, specs } = require("./config/swagger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Contacts API Endpoint Server",
    endpoints: {
      documentation: "GET /api-docs",
      getAllContacts: "GET /api/contacts",
      getContactById: "GET /api/contacts/:id",
      createContact: "POST /api/contacts",
      updateContact: "PUT /api/contacts/:id",
      deleteContact: "DELETE /api/contacts/:id"
    }
  });
});

// Mount Routes
app.use("/api/contacts", contactRoutes);

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Application Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
