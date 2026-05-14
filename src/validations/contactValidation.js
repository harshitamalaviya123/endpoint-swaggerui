const { z } = require("zod");

/**
 * Contact Validation Schema
 */
const contactSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }).trim().min(1, "First name cannot be empty"),
    lastName: z.string({
      required_error: "Last name is required",
    }).trim().min(1, "Last name cannot be empty"),
    email: z.string({
      required_error: "Email address is required",
    }).email("Invalid email address").trim().toLowerCase(),
    phoneNumber: z.string().trim().optional(),
    company: z.string().trim().optional(),
    role: z.string().trim().optional(),
  }),
});

/**
 * Contact Update Validation Schema
 * All fields are optional for partial updates.
 */
const updateContactSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1, "First name cannot be empty").optional(),
    lastName: z.string().trim().min(1, "Last name cannot be empty").optional(),
    email: z.string().email("Invalid email address").trim().toLowerCase().optional(),
    phoneNumber: z.string().trim().optional(),
    company: z.string().trim().optional(),
    role: z.string().trim().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID format"),
  }),
});

/**
 * Contact ID Validation Schema
 */
const contactIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID format"),
  }),
});

module.exports = {
  contactSchema,
  updateContactSchema,
  contactIdSchema,
};
