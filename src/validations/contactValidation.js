const { z } = require("zod");

/**
 * Zod schema for Contact creation
 */
const createContactSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }).trim().min(1, "First name cannot be empty"),
    lastName: z.string({
      required_error: "Last name is required",
    }).trim().min(1, "Last name cannot be empty"),
    email: z.string({
      required_error: "Email address is required",
    }).trim().email("Please provide a valid email address").toLowerCase(),
    phoneNumber: z.string().trim().optional(),
    company: z.string().trim().optional(),
    role: z.string().trim().optional(),
  }),
});

/**
 * Zod schema for Contact update
 */
const updateContactSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID format"),
  }),
  body: z.object({
    firstName: z.string().trim().min(1, "First name cannot be empty").optional(),
    lastName: z.string().trim().min(1, "Last name cannot be empty").optional(),
    email: z.string().trim().email("Please provide a valid email address").toLowerCase().optional(),
    phoneNumber: z.string().trim().optional(),
    company: z.string().trim().optional(),
    role: z.string().trim().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  }),
});

/**
 * Zod schema for Contact ID parameter
 */
const contactIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID format"),
  }),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  contactIdSchema,
};
