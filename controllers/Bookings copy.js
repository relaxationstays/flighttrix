import Bookings from "../models/Bookings.js";
import { v4 as uuidv4 } from "uuid";
// import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";

const generateRandomNumbers = () => {
  const randomNumbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 100)
  );
  return randomNumbers.join(""); // Join the numbers into a single string without commas
};




export const createBookings = async (req, res, next) => {
  // Generate a random 10-character reference
  const uniqueReference = generateRandomNumbers();

  // const PnrDta = req.body.PNR;
  const { PNR } = req.body;
  // Create a new booking with the request body and add the unique reference

  try {
    const updatedPNR = await Bookings.findOneAndUpdate(
      PNR,
      { $set: { Seats:  } },
      { new: true } // Return the modified document
    );

    if (!updatedPNR) {
      return res.status(404).json({ message: "PNR not found" });
    }

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
