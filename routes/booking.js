import express from "express";
import {
  createBookings,
  deleteBookings,
  getBooking,
  getBookings,
  updateBookings,
} from "../controllers/Bookings.js";

const router = express.Router();
//CREATE
router.post("/", createBookings);
//UPDATE
router.put("/:id", updateBookings);
//DELETE
router.delete("/:id", deleteBookings);
//GET
router.get("/:id", getBooking);
//GET ALL
router.get("/", getBookings);

export default router;
