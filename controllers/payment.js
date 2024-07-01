import Payment from "../models/Payment.js";

export const createPayment = async (req, res, next) => {
  const newPayment = new Payment(req.body);
  try {
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (err) {
    next(err);
  }
};
export const updatePayment = async (req, res, next) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

export const getOnePayment = async (req, res, next) => {
  const { id } = req.params;
  console.log("req.params.id:", id);
  try {
    // Assuming you're using Mongoose, you should search by _id field
    const PaymentData = await Payment.findById(id);
    if (!PaymentData) {
      return res.status(404).json({ message: "PaymentData not found" });
    }
    res.status(200).json(PaymentData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getPayment = async (req, res, next) => {
  try {
    const rooms = await Payment.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
