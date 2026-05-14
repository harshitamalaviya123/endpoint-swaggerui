/**
 * Contact Routes
 * Defines comprehensive routing patterns for contact REST API endpoints.
 */
const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts
 * @access  Public
 */
router.get("/", contactController.getContacts);

/**
 * @route   GET /api/contacts/:id
 * @desc    Get single contact by ID
 * @access  Public
 */
router.get("/:id", contactController.getContact);

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact
 * @access  Public
 */
router.post("/", contactController.createContact);

/**
 * @route   PUT /api/contacts/:id
 * @desc    Update a contact by ID
 * @access  Public
 */
router.put("/:id", contactController.updateContact);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact by ID
 * @access  Public
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
