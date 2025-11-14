import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connected successfully✅");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};
