/**
 * Contact Routes
 * Defines comprehensive routing patterns for contact REST API endpoints.
 */
const express = require("express");
const contactController = require("../controllers/contactController");
const validate = require("../middlewares/validate");
const { contactSchema } = require("../validations/contactValidation");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: Email address
 *         phoneNumber:
 *           type: string
 *           description: Phone number
 *         company:
 *           type: string
 *           description: Company name
 *         role:
 *           type: string
 *           description: Role in the company
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         phoneNumber: 123-456-7890
 *         company: Acme Corp
 *         role: Developer
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management API
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Returns the list of all the contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of the contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/", contactController.getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The contact description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 */
router.get("/:id", contactController.getContact);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The contact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error
 */
router.post("/", validate(contactSchema), contactController.createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update the contact by the id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The contact was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", validate(contactSchema), contactController.updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Remove the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The contact was deleted
 *       404:
 *         description: The contact was not found
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
