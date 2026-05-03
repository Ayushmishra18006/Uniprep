import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    age: {
      type: Number,
      required: [true, "Age is required!"],
      min: [16, "Age must be positive"],
    },
  },
  { timestamps: true }
);

// userSchema.index({ username: 1 }); // ascending index
// userSchema.index({ email: 1 }, { unique: true }); // unique index

export default mongoose.model("User", userSchema);