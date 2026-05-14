/**
 * Express Application Configuration
 * Sets up global middleware and registers base routes.
 */
const express = require("express");
const cors = require("cors");
const redoc = require("redoc-express");
const swaggerSpec = require("./config/swagger");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Contacts API Endpoint Server",
    endpoints: {
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

// Serve Swagger JSON
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Serve Redoc UI
app.get("/docs", redoc({
  title: "Contacts API Docs",
  specUrl: "/api-docs/swagger.json",
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: "#6EC5AB"
        }
      },
      typography: {
        fontFamily: `"museo-sans", "Helvetica Neue", Helvetica, Arial, sans-serif`,
        fontSize: "15px",
        lineHeight: "1.5",
        code: {
          code: "#87E8C7",
          backgroundColor: "#4D4D4E"
        }
      }
    }
  }
}));

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
