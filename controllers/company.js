// Company.controller.js
import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Added nodemailer import
// import createError from "http-errors"; // Added createError import

// Create a new Company
export const createCompany = async (req, res) => {
  console.log("data", req.body);
  try {
    let companyData = {
      ...req.body,
      Companyname: req.body.Email, // Ensure you are setting this correctly
    };

    // Check if _id exists in req.body to determine if it's an update or create
    if (req.body._id) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      companyData = {
        ...companyData,
        password: hash, // Use the hashed password for update
      };
      const updatedCompany = await Company.findByIdAndUpdate(
        req.body._id,
        companyData,
        { new: true }
      );

      if (!updatedCompany) {
        return res.status(404).json({ error: "Company not found" });
      }

      res.status(200).json(updatedCompany);
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      companyData = {
        ...companyData,
        password: hash, // Use the hashed password for new company
      };

      const newCompany = new Company(companyData);

      const savedCompany = await newCompany.save();

      res.status(201).json(savedCompany);
    }
  } catch (error) {
    console.error("Error creating/updating Company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Create a new Company
export const emailPortal = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "cpanel-just2091.justhost.com", // Check your cPanel for SMTP server settings
      port: 465,
      secure: true, // Use SSL
      auth: {
        Company: "inquries@relaxationstays.com", // Your cPanel email address
        pass: "Cozy25@@11", // Your cPanel email password
      },
    });
    // Define email options
    let mailOptions = {
      from: "inquries@relaxationstays.com", // Sender email address
      to: req.body.agent, // Recipient email address
      subject: "Test Email", // Subject line
      text: `New Lead.\n Email : ${req.body.email} \n Name : ${req.body.name} \n Phone : ${req.body.phone}  \n Message : ${req.body.message}  `, // Plain text body
    };
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Company.controller.js
// Get all Companys
// export const getAllCompanys = async (req, res) => {
//   try {
//     const Companys = await Company.find();
//     res.status(200).json(Companys);
//   } catch (error) {
//     console.error("Error fetching Companys:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getAllCompanys = async (req, res) => {
  try {
    // Fetch all companies but exclude the password field
    const Companys = await Company.find().select("-password");
    res.status(200).json(Companys);
  } catch (error) {
    console.error("Error fetching Companys:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Company.controller.js

// Update Company by ID
export const updateCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating Company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Company.controller.js

// Delete Company by ID
export const deleteCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    await Company.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const companyData = await Company.findOne({ Email: req.body.Email });
    if (!companyData) {
      return next(createError(404, "Company not found!"));
    }
    if (companyData.AciveStatus) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        companyData.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }
      const token = jwt.sign(
        { id: companyData._id, isAdmin: companyData.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None", // Only use with HTTPS
        secure: true, // Only use with HTTPS
        // sameSite: "Lax",
      });
      // res.cookie("userid", companyData._id);
      res.cookie("userid", String(companyData._id), {
        httpOnly: true,
        sameSite: "None", // Only use with HTTPS
        secure: true, // Only use with HTTPS
        // sameSite: "Lax",
      });
      // res.status(200).send("success");
      res.status(200).send({
        userId: companyData._id,
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      companyData.password = hash;
      companyData.AciveStatus = true;
      const updatedCompany = await companyData.save();
      res.status(200).send("success");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const setPass = async (req, res, next) => {
  console.log("163803", req.body.otp);
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
  console.log("set now mail");

  try {
    const companyData = await Company.findOne({ Email: req.body.Email });
    // if (companyData.AciveStatus) {
    if (companyData.otp == 123) {
      let number = generateRandomNumber();
      companyData.otp = number;
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
      // companyData.AciveStatus = true;
      const updatedCompany = await companyData.save();
      res.status(200).send("success");
    } else {
      if (req.body.otp == companyData.otp) {
        // companyData.otp = 5265362536;
        companyData.AciveStatus = false;
        const updatedCompany = await companyData.save();
        const token = jwt.sign(
          { id: updatedCompany._id, isAdmin: updatedCompany.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "3h" }
        );
        console.log("Suucess Otp");
        res.status(200).send("successotp");
      } else {
        console.log("Error Otp");
        res.status(500).send("error");
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
    const companyData = await Company.findOne({
      Email: req.body.Email,
    });
    if (!companyData) {
      return next(createError(404, "Email not found!"));
    }
    // console.log("true");
    res.status(200).json({ ActiveStatus: companyData.AciveStatus });
  } catch (err) {
    console.log("false");
    // console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
