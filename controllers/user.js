import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Added nodemailer import
export const createUser = async (req, res) => {
  const Poster = req.user.id;
  try {
    const transporter = nodemailer.createTransport({
      host: "cpanel-just2091.justhost.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "noreply@flightrix.com",
        pass: "flixtrixpssxx",
      },
    });
    let UserData = {
      ...req.body,
      Username: req.body.Email.toLowerCase(), // Ensure you are setting this correctly
    };
    // Check if _id exists in req.body to determine if it's an update or create
    if (req.body._id) {
      UserData = {
        ...UserData,
        PostedBy: Poster,
        // password: hash, // Use the hashed password for update
      };
      const updatedUser = await User.findByIdAndUpdate(req.body._id, UserData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    } else {
      const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(req.body.password, salt);
      UserData = {
        ...UserData,
        PostedBy: Poster,
      };
      const newUser = new User(UserData);
      const savedUser = await newUser.save();

      const mailOptions = {
        from: "noreply@flightrix.com",
        to: req.body.Email,
        subject: "Account Verification",
        text: `Your account is created. \n\n\nFollow link to login. \n\n\nhttps://www.flightrix.com/login`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send email" });
        }
        console.log("Email sent: ", info.response);
      });

      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error("Error creating/updating User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Create a new User

export const getAllUsers = async (req, res) => {
  const SuperAdmin = req.user.SuperAdmin;
  const Picker = req.user.id;
  try {
    if (SuperAdmin) {
      const Users = await User.find().select("-password");
      res.status(200).json(Users);
    } else {
      const Users = await User.find({ PostedBy: Picker }).select("-password");
      res.status(200).json(Users);
    }
  } catch (error) {
    console.error("Error fetching Users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// User.controller.js
// Update User by ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const PosterId = req.user.id;
  try {
    const data = {
      ...req.body,
      PostedBy: PosterId,
    };
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const AirportData = await User.findById(id);
    if (!AirportData) {
      return res.status(404).json({ message: "AirportData not found" });
    }
    res.status(200).json(AirportData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const UserData = await User.findOne({ Email: req.body.Email });
    if (!UserData) {
      return next(createError(404, "User not found!"));
    }
    if (UserData.AciveStatus) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        UserData.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      const payload = {
        user: {
          id: UserData.id,
          isAdmin: UserData.isAdmin,
          SuperAdmin: UserData.SuperAdmin,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None", // Only use with HTTPS
        secure: true, // Only use with HTTPS
        // sameSite: "Lax",
      });
      res.status(200).send({
        userId: UserData._id,
        isAdmin: UserData.isAdmin,
        SuperAdmin: UserData.SuperAdmin,
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      UserData.password = hash;
      UserData.AciveStatus = true;
      const updatedUser = await UserData.save();
      res.status(200).send("success");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const setPass = async (req, res, next) => {
  // console.log("reset", req.body.reset);
  const generateRandomNumber = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // Set up Nodemailer
  const transporter = nodemailer.createTransport({
    host: "cpanel-just2091.justhost.com",
    // cpanel-just2091.justhost.com
    port: 465,
    // secure: false, // or 'STARTTLS'
    secure: true, // Use SSL
    auth: {
      user: "noreply@flightrix.com",
      pass: "flixtrixpssxx",
    },
  });
  // console.log("set now mail");
  try {
    const UserData = await User.findOne({ Email: req.body.Email });
    // if (UserData.AciveStatus) {
    // if (UserData.otp == 123) {
    if (req.body.reset == true) {
      let number = generateRandomNumber();
      UserData.otp = number;
      // Send email with new OTP
      const mailOptions = {
        from: "noreply@flightrix.com",
        to: req.body.Email,
        subject: "New OTP for Password Reset",
        text: `Your new OTP is ${number}. Please use this to reset your password.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send email" });
        }
        console.log("Email sent: ", info.response);
        res.status(200).send("success");
      });
      UserData.AciveStatus = true;
      // delete res.body.password;
      const updatedUser = await UserData.save();
      res.status(200).send("success");
    } else {
      if (req.body.otp == UserData.otp) {
        // UserData.otp = 5265362536;
        UserData.AciveStatus = false;
        const updatedUser = await UserData.save();
        const token = jwt.sign(
          { id: updatedUser._id, isAdmin: updatedUser.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "3h" }
        );
        console.log("Suucess Otp");
        res.status(200).send("successotp");
      } else {
        console.log("Error Otp");
        res.status(501).send("error");
      }
    }
    // }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checklogin = async (req, res, next) => {
  try {
    const UserData = await User.findOne({
      Email: req.body.Email,
    });
    if (!UserData) {
      return next(createError(404, "Email not found!"));
    }
    res.status(200).json({ ActiveStatus: UserData.AciveStatus });
  } catch (err) {
    console.log("false");
    // console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
