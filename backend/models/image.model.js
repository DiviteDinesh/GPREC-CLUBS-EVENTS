import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String, // Stores the image file name
  filePath: String, // Stores the file path for serving images
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Image", imageSchema);
