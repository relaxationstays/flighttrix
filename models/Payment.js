import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    dateTime: {
      type: String,
      required: false,
    },
    trans: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
      // unique: true,
    },
    status: {
      type: String,
      required: true,
      // unique: true,
    },
    amount: {
      type: Number,
      // required: true,
    },
    userID: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
