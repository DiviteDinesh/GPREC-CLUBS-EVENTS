import express from 'express';
import { uploadEventImages, createEvent, getEvents, getEventById, upsertEvent } from '../controllers/event.controller.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/', authenticate, isAdmin, createEvent);
router.get('/', getEvents);
router.get('/:eventId', getEventById);

// Add the upsert route for events
router.post('/upsert', authenticate, isAdmin, upsertEvent);

router.post("/:eventId/upload", upload.array("images", 10), uploadEventImages);


export default router;
