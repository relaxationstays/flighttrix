import express from "express";
import {
  createPayment,
  getOnePayment,
  getPayment,
  updatePayment,
} from "../controllers/payment.js";

const router = express.Router();
//CREATE
router.post("/", createPayment);
//UPDATE
router.put("/:id", updatePayment);
//DELETE
//GET
router.get("/find/:id", getOnePayment);
//GET ALL
router.get("/", getPayment);

export default router;
