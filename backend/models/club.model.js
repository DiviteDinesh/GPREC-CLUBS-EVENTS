import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema({
  clubId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  themes: [String],
  eventsActivities: [String],
  membershipDetails: String,
  leadershipContact: String,
  testimonials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Testimonial' }],
  images: [String],
}, { timestamps: true });

export default mongoose.model('Club', ClubSchema);
