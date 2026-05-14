/**
 * Generic validation middleware for Zod schemas.
 * @param {ZodSchema} schema - Zod schema to validate against
 */
const validate = (schema) => (req, res, next) => {
  try {
    // Validate request body against schema
    schema.parse(req.body);
    next();
  } catch (error) {
    // If validation fails, extract and format error messages
    const errorMessages = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }
};

module.exports = validate;
