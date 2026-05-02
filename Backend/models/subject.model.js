import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  videos: [String],
  notes: [String],
  pyq: [String],
  important: [String]
});

export default mongoose.model("Subject", subjectSchema);
