import Event from "../models/event.model.js";

// Fetch all events
export const fetchEvents = async () => {
  return await Event.find();
};

// Fetch an event by its eventId
export const fetchEventById = async (eventId) => {
  return await Event.findOne({ eventId });
};

// Upsert an event: Update if exists, create if not
export const fetchUpsertEvent = async (eventData) => {
  try {
    let event = await Event.findOne({ eventId: eventData.eventId });

    if (event) {
      // Update only fields that are not "NA"
      Object.keys(eventData).forEach((key) => {
        if (eventData[key] !== "NA") {
          event[key] = eventData[key];
        }
      });
      await event.save();
      return { message: "Event updated successfully", event };
    } else {
      // Create a new event
      event = new Event(eventData);
      await event.save();
      return { message: "Event created successfully", event };
    }
  } catch (err) {
    throw new Error("Error in upsertEvent: " + err.message);
  }
};

