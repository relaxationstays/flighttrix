import Airline from "../models/Airlines.js";

export const createAirline = async (req, res, next) => {
  const newAirline = new Airline(req.body);
  try {
    const savedAirline = await newAirline.save();
    res.status(200).json(savedAirline);
  } catch (err) {
    next(err);
  }
};
export const updateAirline = async (req, res, next) => {
  try {
    const updatedAirline = await Airline.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAirline);
  } catch (err) {
    next(err);
  }
};

export const getOneAirline = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const AirlineData = await Airline.findById(id);
    if (!AirlineData) {
      return res.status(404).json({ message: "AirlineData not found" });
    }
    res.status(200).json(AirlineData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAirline = async (req, res, next) => {
  try {
    const rooms = await Airline.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
