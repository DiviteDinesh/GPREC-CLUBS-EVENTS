import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  description: String,
  instructions: String,
  registrationProcess: String,
  registrationLinks: [String],
  contact: String,
  images: [String],
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
