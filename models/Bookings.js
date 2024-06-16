import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      unique: false,
    },
    FirstName: {
      type: String,
      required: true,
      unique: false,
    },
    LastName: {
      type: String,
      required: true,
      unique: false,
    },
    Nationality: {
      type: String,
      unique: false,
    },
    PhoneNumber: {
      type: String,
    },
    PassportNumber: {
      type: String,
      required: true,
      unique: false,
    },
    Reference: {
      type: String,
    },
    isInfant: {
      type: Boolean,
      default: false,
    },
    markup: {
      type: String,
      default: 0,
    },
    tag: {
      type: String,
      // default: false,
    },
    PNR: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PNRModel",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookingSchema", BookingSchema);
