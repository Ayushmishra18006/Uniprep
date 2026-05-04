import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true

  },
videos: {
  type: [String],
  default: []
},
notes: {
  type: [String],
  default: []
},
pyq: {
  type: [String],
  default: []
},
important: {
  type: [String],
  default: []
}
});

export default mongoose.model("Subject", subjectSchema);
