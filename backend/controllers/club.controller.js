import { fetchUpsertClub } from "../services/club.service.js"; // Correct import
import { addClubImages } from "../services/club.service.js";
import Club from "../models/club.model.js";
export const createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getClubs = async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
};

export const getClubById = async (req, res) => {
  const club = await Club.findOne({ clubId: req.params.clubId });
  if (!club) return res.status(404).json({ message: "Club not found" });
  res.json(club);
};

// Call the upsertClub service method
export const upsertClub = async (req, res) => {
  try {
    const result = await fetchUpsertClub(req.body); // Use the service method
    res.status(200).json(result); // Return the result from the service
  } catch (err) {
    // console.error("Error in upsertClub:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update a club: Only update fields that are not "NA"
export const updateClub = async (clubId, clubData) => {
  try {
    let club = await Club.findOne({ clubId });

    if (!club) {
      throw new Error("Club not found");
    }

    // Update only fields that are not "NA"
    Object.keys(clubData).forEach((key) => {
      if (clubData[key] !== "NA") {
        club[key] = clubData[key];
      }
    });

    await club.save();
    return { message: "Club updated successfully", club };
  } catch (err) {
    throw new Error("Error in updateClub service: " + err.message);
  }
};

export const uploadClubImages = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Construct new image URLs
    const newImageUrls = req.files.map(file => `${process.env.URL}/images/${file.filename}`);

    // Update club by adding new images
    const club = await Club.findOneAndUpdate(
      { clubId },
      { $push: { images: { $each: newImageUrls } } }, // Append new images
      { new: true }
    );

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({
      message: "Images uploaded successfully!",
      uploadedImages: newImageUrls // Send only the newly uploaded images
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading images", error: error.message });
  }
};
