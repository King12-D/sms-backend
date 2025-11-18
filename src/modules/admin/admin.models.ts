import mongoose from "mongoose";

interface Data {
  schoolName: string;
  schoolAddress: string;
  schoolEmail: string;
  schoolPhone: number;
  adminName: string;
  email: string;
  adminPhone: number;
  password: string;
  role: string;
}

const adminSchema = new mongoose.Schema<Data>({
  schoolName: {
    type: String,
  },

  schoolAddress: {
    type: String,
  },

  schoolEmail: {
    type: String,
  },

  schoolPhone: {
    type: Number,
  },

  adminName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  adminPhone: {
    type: Number,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
    default: "admin",
  },
});

export default mongoose.model("Admin", adminSchema);
