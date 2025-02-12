import express from "express";
import { submitRequest, getPendingRequests, handleRequest } from "../controllers/admin.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/submit-request", authenticate, submitRequest);
router.get("/pending-requests", authenticate, isAdmin, getPendingRequests);
router.post("/handle-request/:id", authenticate, isAdmin, handleRequest);

export default router;
