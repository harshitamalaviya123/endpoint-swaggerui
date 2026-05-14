/**
 * Contact Routes
 * Defines comprehensive routing patterns for contact REST API endpoints.
 */
const express = require("express");
const contactController = require("../controllers/contactController");
const validate = require("../middlewares/validate");
const { contactSchema } = require("../validations/contactValidation");

const router = express.Router();

router.get("/", contactController.getContacts);

router.get("/:id", contactController.getContact);

router.post("/", validate(contactSchema), contactController.createContact);

router.put("/:id", validate(contactSchema), contactController.updateContact);

router.delete("/:id", contactController.deleteContact);

module.exports = router;
