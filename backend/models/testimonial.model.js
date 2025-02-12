import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  name: String,
  message: String,
}, { timestamps: true });

export default mongoose.model('Testimonial', TestimonialSchema);
