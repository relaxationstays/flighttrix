import mongoose from "mongoose";
const PNRSchema = new mongoose.Schema(
  {
    PNR: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    purchasePrice: {
      type: String,
      required: true,
    },
    purchaseInfantPrice: {
      type: String,
      required: false,
    },
    infantprice: {
      type: String,
      required: true,
    },
    Route1: {
      type: String,
      required: true,
    },
    Route2: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    Airline: {
      type: String,
      required: true,
    },
    Code1: {
      type: String,
      required: true,
    },
    Code2: {
      type: String,
      required: true,
    },
    Seats: {
      type: String,
      required: true,
    },
    time: {
      AA: {
        type: String,
        required: true,
      },
      AB: {
        type: String,
        required: true,
      },
      BA: {
        type: String,
        required: true,
      },
      BB: {
        type: String,
        required: true,
      },
    },
    PostedBy: {
      // type: Number,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PNRModel", PNRSchema);
