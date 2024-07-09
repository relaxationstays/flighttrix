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
    Whatsapp: {
      type: String,
      required: [true, "Please input the Whatsapp number!"],
    },
    Password: {
      type: String,
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
    otp: {
      type: Number,
      default: 123,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
