import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected succesfully 🔐");
    })
    .catch((err) => {
      console.log("MongoDB connection error ❌");
      process.exit(1);
    });
};

export default connectDB;
