const { z } = require("zod");

const contactSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).trim().min(1, "First name cannot be empty"),
  lastName: z.string({ required_error: "Last name is required" }).trim().min(1, "Last name cannot be empty"),
  email: z.string({ required_error: "Email is required" }).trim().email("Please provide a valid email address"),
  phoneNumber: z.string().trim().optional(),
  company: z.string().trim().optional(),
  role: z.string().trim().optional(),
});

module.exports = { contactSchema };
