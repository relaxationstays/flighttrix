import Bookings from "../models/Bookings.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import User from "../models/User.js";
// import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";
import PNR from "../models/Pnr.js";
axios.defaults.withCredentials = true;

const generateRandomNumbers = () => {
  const randomNumbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 100)
  );
  return randomNumbers.join(""); // Join the numbers into a single string without commas
};

export const createBookings = async (req, res, next) => {
  console.log("Booking now.......");
  // Generate a random 10-character reference
  const uniqueReference = generateRandomNumbers();
  const { PNR: PNRID } = req.body;
  // const { issuer: issuer } = req.body;
  const { issuer: issuer } = req.user.id;
  const isAdmin = req.user.SuperAdmin;
  try {
    // Find the PNR by its _id
    const pnrDocument = await PNR.findById(PNRID);
    if (!pnrDocument) {
      return res.status(404).json({ message: "PNR not Found" });
    }
    // Subtract one from the current Seats value
    const updatedSeats = pnrDocument.Seats - 1;
    // Update the document with the new Seats value
    // const updatedPNR = await PNR.findByIdAndUpdate(
    //   PNRID,
    //   { $set: { Seats: updatedSeats } },
    //   { new: true } // Return the modified document
    // );
    const UserDocument = await User.findById(issuer);
    if (!UserDocument) {
      return res.status(404).json({ message: "User not found" });
    }
    // Subtract one from the current Seats value
    const BalanceUpdate = UserDocument.Balance - pnrDocument.price;
    // Update the document with the new Seats value
    // const updatedComapny = await User.findByIdAndUpdate(
    //   issuer,
    //   { $set: { Balance: BalanceUpdate } },
    //   { new: true } // Return the modified document
    // );
    // // Create a new booking with the request body and add the unique reference
    const newBookings = new Bookings({
      ...req.body,
      Reference: "A2A-" + uniqueReference,
    });
    // const savedBookings = await newBookings.save();
    const savedBookings = newBookings;
    // const UserData = await User.findById(issuer);
    const UserCustomer = await User.findById("66695b088b3d4ae31e6f0f73");
    const cust = {
      name: UserCustomer.FirstName + " " + UserCustomer.LastName,
      email: UserCustomer.Email,
      mobile: UserCustomer.Telephone,
    };

    if (savedBookings) {
      const invoiceData = {
        invoiceNumber: Math.floor(100000 + Math.random() * 900000),
        issuedDate: savedBookings.createdAt,
        dueDate: savedBookings.createdAt,
        customer: cust,
        items: {
          name: "A2A | Ticket",
          price: 1500,
          firstname: savedBookings.FirstName,
          lastname: savedBookings.LastName,
          nationality: savedBookings.Nationality,
          passport: savedBookings.PassportNumber,
          quantity: 1,
        },
        subtotal: 1500,
        balance: 1500,
        discount: 0,
        tax,
        total: 1500,
        salesperson: invoiceDetails.salesperson,
        note: "Booked from fightrix",
      };
      // console.log("...", invoiceData);
      console.log("..invoiceData.", invoiceData);
      try {
        // const response = await ApiPath.post("/invoice", invoiceData);
        const response = await axios.post(
          `http://localhost:8801/ap1/invoice`,
          combinedValues
        );
        console.log("Invoice saved:", response.data);
      } catch (error) {
        console.error("Error submitting invoice:", error);
      }
    }
    res.status(200).json(savedBookings);
  } catch (err) {
    next(err);
  }
};

export const updateBookings = async (req, res, next) => {
  const { bookingID } = req.params; // Get the booking ID from the request parameters
  // const { PNR: PNRID, issuer } = req.body;
  const isAdmin = req.user.isAdmin;
  try {
    // Find the booking by its ID
    const bookingDocument = await Bookings.findById(bookingID);
    if (!bookingDocument) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // Find the PNR by its _id
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update bookings" });
    }

    // Update the necessary fields of the booking
    const updatedBookingData = {
      ...req.body,
    };
    // Update the booking document with the new data
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingID,
      { $set: updatedBookingData },
      { new: true } // Return the modified document
    );

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

export const deleteBookings = async (req, res, next) => {};

export const getBooking = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const Bookin = await Bookings.findById(id);
    if (!Bookin) {
      return res.status(404).json({ message: "Bookin not found" });
    }
    res.status(200).json(Bookin);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  const id = req.user.id;
  const isAdmin = req.user.SuperAdmin;
  console.log("user", id);
  try {
    if (isAdmin) {
      const rooms = await Bookings.find(); // Modify query to filter by issuer === id
      res.status(200).json(rooms);
    } else {
      const rooms = await Bookings.find({ issuer: id }); // Modify query to filter by issuer === id
      res.status(200).json(rooms);
    }
  } catch (err) {
    next(err);
  }
};
