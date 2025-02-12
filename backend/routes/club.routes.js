import express from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadClubImages } from "../controllers/club.controller.js";
import { createClub, getClubs, getClubById, updateClub, upsertClub } from "../controllers/club.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, createClub);
router.get("/", getClubs);
router.get("/:clubId", getClubById);
router.put("/:clubId", authenticate, isAdmin, updateClub); // Add this route
router.post("/upsert", authenticate, isAdmin, upsertClub); // Route for upsert
router.post("/:clubId/upload", upload.array("images", 10), uploadClubImages);



export default router;