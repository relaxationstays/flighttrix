import Payment from "../models/Payment.js";
import Company from "../models/Company.js";

// export const createPayment = async (req, res, next) => {
//   const { id } = req.params;
//   const newPayment = new Payment(req.body);
//   try {
//     const savedPayment = await newPayment.save();
//     res.status(200).json(savedPayment);
//   } catch (err) {
//     next(err);
//   }
// };
export const createPayment = async (req, res, next) => {
  const userId = req.user.id;
  const transnum = () => {
    const min = 100000000; // Minimum 6-digit number
    const max = 999999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let data = {
    ...req.body,
    userID: userId,
    trans: String(transnum()),
    status: "false",
  };
  const newPayment = new Payment(data);
  try {
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (err) {
    next(err);
  }
};
export const updatePayment = async (req, res, next) => {
  const _iddata = req.body._id;
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      _iddata,
      { $set: { status: req.body.status } },
      { new: true }
    );

    const companyData = await Company.findOne({ _id: updatedPayment.userID });

    if (req.body.status == "true") {
      companyData.Balance =
        Number(companyData.Balance) + Number(updatedPayment.amount);
    }

    const updatedCompany = await companyData.save();
    console.log(companyData);
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
