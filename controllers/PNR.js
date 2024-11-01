import PNR from "../models/Pnr.js";
export const createPNR = async (req, res, next) => {
  const newPNR = new PNR(req.body);
  try {
    const savedPNR = await newPNR.save();
    res.status(200).json(savedPNR);
  } catch (err) {
    next(err);
  }
};
// export const updatePNR = async (req, res, next) => {
//   try {
//     const updatedPNR = await PNR.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedPNR);
//   } catch (err) {
//     next(err);
//   }
// };
export const updatePNR = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCompany = await PNR.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating Company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deletePNR = async (req, res, next) => {
  try {
    await PNR.findByIdAndDelete(req.params.id);
    res.status(200).json("PNR has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getPNR = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const pnr = await PNR.findById(id);
    if (!pnr) {
      return res.status(404).json({ message: "PNR not found" });
    }
    res.status(200).json(pnr);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getPNRS = async (req, res, next) => {
  try {
    const rooms = await PNR.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
