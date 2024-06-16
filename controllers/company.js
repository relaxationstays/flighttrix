// Company.controller.js
import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Added nodemailer import
// import createError from "http-errors"; // Added createError import

// Create a new Company
export const createCompany = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newCompany = new Company({
      ...req.body,
      Companyname: req.body.Email,
      password: hash, // Use the hashed password
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error("Error creating Company:", error);
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
export const getAllCompanys = async (req, res) => {
  try {
    const Companys = await Company.find();
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
    const Company = await Company.findOne({
      "CompanyCredentials.Companyname": req.body.Email,
    });
    if (!Company) return next(createError(404, "Company not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      Company.password
    );

    if (!isPasswordCorrect) {
      return res.status(500).json({ error: "Wrong Company or Password" });
    }

    const token = jwt.sign(
      { id: Company._id, isAdmin: Company.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = Company._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
