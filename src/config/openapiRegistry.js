/**
 * OpenAPI Registry Configuration
 * Integrates Zod schemas with Swagger JSDoc for automated OpenAPI specification generation.
 */
const { createDocument } = require("zod-openapi");
const { contactSchema } = require("../validations/contactValidation");

/**
 * Generate OpenAPI components from Zod schemas
 */
const generateComponents = () => {
  const document = createDocument({
    openapi: "3.1.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Contact: contactSchema,
        ContactInput: contactSchema, // You can differentiate if needed
      },
    },
  });

  return document.components;
};

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Premium Contacts API",
      version: "1.0.0",
      description: "A professional REST API for managing high-value business contacts.",
      contact: {
        name: "API Support",
        email: "support@premiumcorp.io",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: generateComponents(),
  },
  // Path to the API docs (routes where JSDoc annotations are located)
  apis: ["./src/routes/*.js"], 
};

module.exports = swaggerOptions;
