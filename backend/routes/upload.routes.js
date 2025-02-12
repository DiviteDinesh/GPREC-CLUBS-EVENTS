import express from "express";
import { uploadImages } from "../controllers/upload.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/upload", upload.array("images", 10), uploadImages);

export default router;
