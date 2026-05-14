/**
 * Contact Service
 * Coordinates persistent storage interactions via the Contact Mongoose Model.
 */
const Contact = require("../models/contactModel");

/**
 * Fetch all contacts from the MongoDB collection.
 * @returns {Promise<Array<Object>>} Array of contact documents
 */
const getAllContacts = async () => {
  try {
    // Retrieve all documents sorted by creation date descending
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return contacts;
  } catch (error) {
    throw new Error(`Database error querying contacts: ${error.message}`);
  }
};

/**
 * Fetch a single contact by its unique document ID.
 * @param {string} id - MongoDB document ID
 * @returns {Promise<Object|null>} Found contact document or null
 */
const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    throw new Error(`Database error querying contact by ID: ${error.message}`);
  }
};

/**
 * Create and persist a new contact document.
 * @param {Object} contactData - Data mapping to Contact schema
 * @returns {Promise<Object>} Created contact document
 */
const createContact = async (contactData) => {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    throw new Error(`Database error creating contact: ${error.message}`);
  }
};

/**
 * Update existing contact fields by ID.
 * @param {string} id - MongoDB document ID
 * @param {Object} updateData - Properties to overwrite
 * @returns {Promise<Object|null>} Updated contact document or null
 */
const updateContact = async (id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true, // Return modified document rather than original
      runValidators: true // Enforce strict schema constraints dynamically
    });
    return updatedContact;
  } catch (error) {
    throw new Error(`Database error updating contact: ${error.message}`);
  }
};

/**
 * Delete a specific contact document by ID.
 * @param {string} id - MongoDB document ID
 * @returns {Promise<Object|null>} Deleted contact document or null
 */
const deleteContact = async (id) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw new Error(`Database error deleting contact: ${error.message}`);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
