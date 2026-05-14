const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Swagger Definition
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API Documentation",
      version: "1.0.0",
      description: "A comprehensive API for managing contact information, built with Express and MongoDB.",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: "object",
          required: ["firstName", "lastName", "email"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the contact",
            },
            firstName: {
              type: "string",
              description: "The first name of the contact",
            },
            lastName: {
              type: "string",
              description: "The last name of the contact",
            },
            email: {
              type: "string",
              description: "The email address of the contact",
            },
            phoneNumber: {
              type: "string",
              description: "The phone number of the contact",
            },
            company: {
              type: "string",
              description: "The company name",
            },
            role: {
              type: "string",
              description: "The job role/title",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the contact was added",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date the contact was last updated",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
