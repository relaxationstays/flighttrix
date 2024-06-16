import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    AgencyName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
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
      type: String,
      default: false,
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
    Designation: {
      type: String,
      default: false,
    },
    Designation: {
      type: String,
      default: false,
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
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
