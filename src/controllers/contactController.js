/**
 * Contact Controller
 * Intercepts HTTP requests, delegates to services, and shapes HTTP responses.
 */
const contactService = require("../services/contactService");

/**
 * Handle GET request for all contacts.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error("Error in getContacts controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

/**
 * Handle GET request for a single contact by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactService.getContactById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(`Error in getContact controller for ID ${req.params.id}:`, error);
    // Determine if error is caused by a malformed MongoDB ObjectID
    if (error.message.includes("Cast to ObjectId failed")) {
      return res.status(400).json({
        success: false,
        message: "Invalid Contact ID format"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

/**
 * Handle POST request to create a new contact.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createContact = async (req, res) => {
  try {
    const newContact = await contactService.createContact(req.body);

    return res.status(201).json({
      success: true,
      data: newContact
    });
  } catch (error) {
    console.error("Error in createContact controller:", error);
    // Catch Mongoose schema validation duplicate key or validation failures
    if (error.message.includes("validation failed") || error.message.includes("E11000 duplicate key")) {
      return res.status(400).json({
        success: false,
        message: "Input validation failed",
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

/**
 * Handle PUT request to update an existing contact.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await contactService.updateContact(id, req.body);

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    console.error(`Error in updateContact controller for ID ${req.params.id}:`, error);
    if (error.message.includes("Cast to ObjectId failed") || error.message.includes("validation failed")) {
      return res.status(400).json({
        success: false,
        message: "Input update constraint validation failed",
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

/**
 * Handle DELETE request to remove a contact.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactService.deleteContact(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact successfully deleted",
      data: deletedContact
    });
  } catch (error) {
    console.error(`Error in deleteContact controller for ID ${req.params.id}:`, error);
    if (error.message.includes("Cast to ObjectId failed")) {
      return res.status(400).json({
        success: false,
        message: "Invalid Contact ID format"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};
