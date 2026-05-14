/**
 * Database Seeder Script
 * Populates sample premium contacts into the MongoDB database.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("../models/contactModel");

const sampleContacts = [
  {
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena.rostova@premiumcorp.io",
    phoneNumber: "+1-555-8899",
    company: "Apex Global Dynamics",
    role: "Chief Technology Officer"
  },
  {
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus.vance@vanceventures.com",
    phoneNumber: "+1-555-4433",
    company: "Vance Capital",
    role: "Managing Partner"
  },
  {
    firstName: "Sophia",
    lastName: "Chen",
    email: "sophia.chen@nexuslabs.dev",
    phoneNumber: "+1-555-1122",
    company: "Nexus Labs",
    role: "Principal AI Architect"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB. Clearing existing contacts...");
    await Contact.deleteMany({});
    
    console.log("Inserting premium sample contacts...");
    await Contact.insertMany(sampleContacts);
    
    console.log("Database seeded successfully! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
