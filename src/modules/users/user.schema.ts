import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  date: Date;
}

const usersSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user",
  },

  date: Date,
});

export const User = mongoose.model("User", usersSchema);
