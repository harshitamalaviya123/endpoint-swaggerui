/**
 * Contact Service
 * Coordinates persistent storage interactions via the Contact Model.
 */
const Contact = require("../models/contactModel");

function getAllContacts() {
  return Contact.find({}).sort({ createdAt: -1 });
}

function getContactById(id) {
  return Contact.findById(id);
}

function createContact(contactData) {
  return Contact.create(contactData);
}

function updateContact(id, updateData) {
  return Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
