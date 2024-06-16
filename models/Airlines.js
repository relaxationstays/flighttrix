import mongoose from "mongoose";
const AirlineSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
      // unique: true,
    },
    code: {
      type: String,
      required: true,
      // unique: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Airline", AirlineSchema);
