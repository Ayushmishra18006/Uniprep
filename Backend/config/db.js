import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host} 🚀`);
  } catch (error) {
    console.error("MongoDB connection error ❌");
    console.error(error.message);   // 👈 ADD THIS
    process.exit(1);
  }
};

export default connectDB;