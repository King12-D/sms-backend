import mongoose from "mongoose";

interface Card {
  serial: string;
  pin: string;
  price: number;
  status: string;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<Card>(
  {
    serial: {
      type: String,
      unique: true,
    },

    pin: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["unused", "sold", "used"],
      default: "unused",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
