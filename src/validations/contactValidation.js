const { z } = require("zod");

const contactSchema = z.object({
  firstName: z.string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name cannot be empty")
    .meta({ description: "Contact's first name", example: "Elena" }),
  lastName: z.string({ required_error: "Last name is required" })
    .trim()
    .min(1, "Last name cannot be empty")
    .meta({ description: "Contact's last name", example: "Rostova" }),
  email: z.string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address")
    .meta({ description: "Contact's primary email address", example: "elena.rostova@premiumcorp.io" }),
  phoneNumber: z.string()
    .trim()
    .optional()
    .meta({ description: "Contact's phone number", example: "+1-555-8899" }),
  company: z.string()
    .trim()
    .optional()
    .meta({ description: "Current company of the contact", example: "Apex Global Dynamics" }),
  role: z.string()
    .trim()
    .optional()
    .meta({ description: "Job title or role", example: "Chief Technology Officer" }),
});

module.exports = { contactSchema };
