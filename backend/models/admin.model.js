import mongoose from "mongoose";

const AdminRequestSchema = new mongoose.Schema({
  type: { type: String, enum: ["club", "event"], required: true },
  data: { type: Object, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  facultyName : { type: String, required: true },
  description : { type: String, required: true },
  clubId : {type : String, required: true},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AdminRequest", AdminRequestSchema);
