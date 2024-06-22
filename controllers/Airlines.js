import Airline from "../models/Airlines.js";

// export const createAirline = async (req, res, next) => {
//   const newAirline = new Airline(req.body);
//   try {
//     const savedAirline = await newAirline.save();
//     res.status(200).json(savedAirline);
//   } catch (err) {
//     next(err);
//   }
// };

export const createAirline = async (req, res, next) => {
  const { _id, ...updateData } = req.body; // Extract _id and other data from req.body
  try {
    if (_id) {
      // If _id exists, update the existing document
      const updatedAirline = await Airline.findOneAndUpdate(
        { _id },
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedAirline) {
        return res.status(404).json({ error: "Airline not found" });
      }
      return res.status(200).json(updatedAirline);
    } else {
      // If _id does not exist, save a new document
      const newAirline = new Airline(updateData);
      const savedAirline = await newAirline.save();

      res.status(201).json(savedAirline);
    }
  } catch (err) {
    next(err); // Pass any errors to the error handler middleware
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
  // console.log("req.params.id:", id);
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
