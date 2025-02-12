import Image from "../models/image.model.js";
import path from "path";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Store uploaded image information in MongoDB
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const image = new Image({
          filename: file.filename,
          filePath: `/images/${file.filename}` // Fix path to match actual storage location
        });
        await image.save();

        return {
          id: image._id,
          url: `${process.env.URL}${image.filePath}` // URL for frontend
        };
      })
    );

    res.status(200).json({
      message: "Images uploaded successfully!",
      uploadedImages // Ensure frontend expects this key
    });
  } catch (err) {
    // console.error("Error uploading images:", err);
    res.status(500).json({ message: "Failed to upload images", error: err.message });
  }
};
