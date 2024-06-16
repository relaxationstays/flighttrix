import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    AgencyName: {
      type: String,
      required: true,
      unique: true,
    },
    Address: {
      type: String,
      required: true,
      unique: true,
    },
    Website: {
      type: String,
      required: true,
    },
    Nationality: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    Zipcode: {
      type: String,
      required: true,
    },
    AgentName: {
      type: String,
      required: true,
    },
    Number: {
      type: Boolean,
      default: false,
    },
    Telephone: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Designation: {
      type: Boolean,
      default: false,
    },
    Designation: {
      type: Boolean,
      default: false,
    },
    Whatsapp: {
      type: Boolean,
      default: false,
    },
    Passowrd: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", UserSchema);
