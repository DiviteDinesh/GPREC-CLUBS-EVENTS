import { fetchUpsertEvent } from "../services/event.service.js"; // Correct import
import Event from "../models/event.model.js"
import upload from "../middleware/multer.middleware.js";


export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findOne({ eventId: req.params.eventId });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};

// Call the upsertEvent service method
export const upsertEvent = async (req, res) => {
  try {
    const result = await fetchUpsertEvent(req.body); // Use the service method
    res.status(200).json(result); // Return the result from the service
  } catch (err) {
    // console.error("Error in upsertEvent:", err);
    res.status(500).json({ message: err.message });
  }
};
import path from "path";
import fs from "fs";

// Upload images and return their URLs
export const uploadEventImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Ensure images folder exists
    const uploadDir = path.join("public", "images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Construct image URLs
    const newImageUrls = req.files.map(file => `${process.env.URL}/images/${file.filename}`);

    res.status(200).json({
      message: "Images uploaded successfully!",
      uploadedImages: newImageUrls, // Send back the URLs
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading images", error: error.message });
  }
};
