import express from "express";
import {
  createBookings,
  deleteBookings,
  getBookings,
  getBookingss,
  updateBookings,
} from "../controllers/Bookings.js";
 
const router = express.Router();
//CREATE
router.post("/", createBookings);
//UPDATE
router.put("/:id", updateBookings);
//DELETE
router.delete("/:id/:hotelid",  deleteBookings);
//GET
router.get("/:id", getBookings);
//GET ALL
router.get("/", getBookingss);

export default router;
