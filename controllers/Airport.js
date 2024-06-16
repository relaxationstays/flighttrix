import Airport from "../models/Airports.js";

export const createAirport = async (req, res, next) => {
  const newAirport = new Airport(req.body);
  try {
    const savedAirport = await newAirport.save();
    res.status(200).json(savedAirport);
  } catch (err) {
    next(err);
  }
};
export const updateAirport = async (req, res, next) => {
  try {
    const updatedAirport = await Airport.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAirport);
  } catch (err) {
    next(err);
  }
};

export const getOneAirport = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const AirportData = await Airport.findById(id);
    if (!AirportData) {
      return res.status(404).json({ message: "AirportData not found" });
    }
    res.status(200).json(AirportData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAirport = async (req, res, next) => {
  try {
    const rooms = await Airport.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
