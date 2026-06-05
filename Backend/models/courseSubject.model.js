import mongoose from "mongoose";

const courseSubjectSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  { timestamps: true }
);

const CourseSubject = mongoose.model(
  "CourseSubject",
  courseSubjectSchema
);

export default CourseSubject;