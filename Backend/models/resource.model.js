import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    subject_slug: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["videos", "notes", "pyq", "important"],
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;