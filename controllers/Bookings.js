import Bookings from "../models/Bookings.js";
import { v4 as uuidv4 } from "uuid";
// import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";

import PNR from "../models/Pnr.js";

const generateRandomNumbers = () => {
  const randomNumbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 100)
  );
  return randomNumbers.join(""); // Join the numbers into a single string without commas
};

export const createBookings = async (req, res, next) => {
  // Generate a random 10-character reference
  const uniqueReference = generateRandomNumbers();

  const { PNR: PNRID } = req.body;

  try {
    // Find the PNR by its _id
    const pnrDocument = await PNR.findById(PNRID);

    if (!pnrDocument) {
      return res.status(404).json({ message: "PNR not found" });
    }
    // Subtract one from the current Seats value
    const updatedSeats = pnrDocument.Seats - 1;
    // Update the document with the new Seats value
    const updatedPNR = await PNR.findByIdAndUpdate(
      PNRID,
      { $set: { Seats: updatedSeats } },
      { new: true } // Return the modified document
    );

    // Create a new booking with the request body and add the unique reference
    const newBookings = new Bookings({
      ...req.body,
      Reference: "A2A-" + uniqueReference,
    });

    const savedBookings = await newBookings.save();
    res.status(200).json(savedBookings);
  } catch (err) {
    next(err);
  }
};

export const updateBookings = async (req, res, next) => {
  try {
    const updatedBookings = await Bookings.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBookings);
  } catch (err) {
    next(err);
  }
};
export const deleteBookings = async (req, res, next) => {
  // const hotelId = req.params.id;
  // try {
  //   await Bookings.findByIdAndDelete(req.params.id);
  //   try {
  //     await Hotel.findByIdAndUpdate(hotelId, {
  //       $pull: { Bookingss: req.params.id },
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  //   res.status(200).json("Bookings has been deleted.");
  // } catch (err) {
  //   next(err);
  // }
};
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
  try {
    const rooms = await Bookings.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
