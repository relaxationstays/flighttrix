import mongoose from "mongoose";
const Companychema = new mongoose.Schema(
  {
    AgencyName: {
      type: String,
      required: true,
      unique: false,
    },
    AccountNo: {
      type: String,
      required: true,
      unique: true,
    },
    Balance: {
      type: String,
      required: true,
      unique: false,
    },
    contactPerson: {
      type: String,
      required: true,
      // unique: true,
    },
    Address: {
      type: String,
      required: true,
      // unique: true,
    },
    Website: {
      type: String,
      // required: true,
    },
    Logo: {
      type: String,
      // required: true,
    },
    Nationality: {
      type: String,
    },
    City: {
      type: String,
      // required: true,
    },
    Zipcode: {
      type: String,
      // required: true,
    },
    Telephone: {
      type: String,
      default: false,
    },
    Email: {
      type: String,
      default: false,
      unique: true,
    },
    Whatsapp: {
      type: String,
      default: false,
      unique: false,
    },
    password: {
      type: String,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    PostedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    AciveStatus: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: 123,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", Companychema);
