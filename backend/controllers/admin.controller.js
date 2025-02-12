import AdminRequest from "../models/admin.model.js"; 
import { fetchUpsertClub } from "../services/club.service.js"; 
import { fetchUpsertEvent } from "../services/event.service.js"; 
import fetch from "node-fetch"; // Needed to make HTTP requests to our own server

export const submitRequest = async (req, res) => {
  try {
    // console.log("req : ", req.body);
    const request = new AdminRequest(req.body);

    await request.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await AdminRequest.find({ status: "pending" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await AdminRequest.findById(req.params.id);
    // console.log("Request", request);
    if (!request) return res.status(404).json({ message: "Request not found" });
    
    let response;
    
    if (status === "approved") {
      if (request.type === "club") {
        // Call the upsertClub method from services
        const result = await fetchUpsertClub(request.data);
        response = result;
      } else if (request.type === "event") {
        // Call the upsertEvent method from services
        const result = await fetchUpsertEvent(request.data);
        response = result;
      }

      if (response && response.message === "Club updated successfully" || response.message === "Club created successfully" || 
          response.message === "Event updated successfully" || response.message === "Event created successfully"
      ) {
        request.status = "approved";
        await request.save();
        return res.json({ message: "Request approved successfully" });
      } else {
        return res.status(400).json({ message: "Failed to upsert data" });
      }
    } else {
      request.status = "rejected";
      await request.save();
      return res.json({ message: "Request rejected successfully" });
    }
  } catch (err) {
    // console.log("message at handle : ", err.message);
    res.status(500).json({ message: err.message });
  }
};
