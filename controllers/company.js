import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Added nodemailer import
export const createCompany = async (req, res) => {
  const id = req.user.id;
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

    let companyData = {
      ...req.body,
      Companyname: req.body.Email.toLowerCase(), // Ensure you are setting this correctly
    };
    // Check if _id exists in req.body to determine if it's an update or create
    if (req.body._id) {
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(req.body.password, salt);
      companyData = {
        ...companyData,
        // const companyId = req.user.id;
        PostedBy: id,
        // password: hash, // Use the hashed password for update
      };

      const updatedCompany = await Company.findByIdAndUpdate(
        req.body._id,
        companyData,
        { new: true }
      );

      if (!updatedCompany) {
        return res.status(404).json({ error: "Company not found" });
      }
      console.log("Upadted", updatedCompany);
      res.status(200).json(updatedCompany);
    } else {
      const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(req.body.password, salt);
      companyData = {
        ...companyData,
      };
      const newCompany = new Company(companyData);
      const savedCompany = await newCompany.save();

      const mailOptions = {
        from: "noreply@flightrix.com",
        to: req.body.Email,
        subject: "Company Account Verification",
        text: `Your Company Account is created. \n\n\nFollow link to login. \n\n\nhttps://www.flightrix.com/login`,
      };

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

export const getAllCompanys = async (req, res) => {
  const id = req.user.id;
  const SuperAdmin = req.user.SuperAdmin;
  try {
    if (SuperAdmin) {
      const rooms = await Company.find(); // Modify query to filter by issuer === id
      res.status(200).json(rooms);
    } else {
      const rooms = await Company.find(); // Modify query to filter by issuer === id
      // const rooms = await Company.find({ PostedBy: id }); // Modify query to filter by issuer === id
      res.status(200).json(rooms);
    }
  } catch (error) {
    console.error("Error fetching Companys:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateCompanyById = async (req, res) => {
  console.log("George Egrpeg");
  const { id } = req.params;
  const userID = req.user.id;
  try {
    let companyData = {
      ...req.body,
      PostedBy: userID,
    };
    const updatedCompany = await Company.findByIdAndUpdate(id, companyData, {
      new: true,
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating Company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompanyById = async (req, res, next) => {
  const companyId = req.user.id;
  console.log("req.user.companyId:", companyId);
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

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

      const payload = {
        user: {
          id: companyData.id,
          isAdmin: companyData.isAdmin,
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
        userId: companyData._id,
        isAdmin: companyData.isAdmin,
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
  console.log("reset", req.body.reset);
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
    // if (companyData.otp == 123) {
    if (req.body.reset == true) {
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
      companyData.AciveStatus = true;
      // delete res.body.password;
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
