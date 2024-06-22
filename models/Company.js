import mongoose from "mongoose";
const Companychema = new mongoose.Schema(
  {
    AgencyName: {
      type: String,
      required: true,
      unique: true,
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
      unique: true,
    },
    password: {
      type: String,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    AciveStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", Companychema);
