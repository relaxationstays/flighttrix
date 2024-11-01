import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    Salutation: {
      type: String,
      enum: ["Mr.", "Ms", "Mrs"],
      required: [true, "Please input the agency name!"],
    },
    FirstName: {
      type: String,
      required: [true, "Please input the first name!"],
    },
    LastName: {
      type: String,
      required: [true, "Please input the last name!"],
    },
    Email: {
      type: String,
      required: [true, "Please input the email!"],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    Company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    Rights: {
      type: String,
      // enum: ["FullAdmin", "BookingAndReports", "BookOnly", "ReportsOnly"],
      required: [true, "Please input the city!"],
    },
    Notification: {
      type: String,
      // enum: ["Email", "Whatsapp", "Sms"],
    },
    TelephoneCode: {
      type: String,
      // enum: ["", "971", "256"],
      default: "",
    },
    Telephone: {
      type: String,
      required: [true, "Please input the telephone number!"],
    },
    WhatsappCode: {
      type: String,
      // enum: ["", "971", "256"],
      default: "",
    },
    AciveStatus: {
      type: Boolean,
      // enum: ["", "971", "256"],
      default: false,
    },
    SuperAdmin: {
      type: Boolean,
      // enum: ["", "971", "256"],
      default: false,
    },
    Whatsapp: {
      type: String,
      required: [true, "Please input the Whatsapp number!"],
    },
    Status: {
      type: Boolean,
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
    password: {
      type: String,
      default: 123,
    },
    otp: {
      type: Number,
      default: 123,
    },
    PostedBy: {
      // type: Number,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
