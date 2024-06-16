import express from "express";
import {
  createAirport,
  getOneAirport,
  getAirport,
  updateAirport,
} from "../controllers/Airport.js";

const router = express.Router();
//CREATE
router.post("/", createAirport);
//UPDATE
router.put("/:id", updateAirport);
//DELETE
//GET
router.get("/find/:id", getOneAirport);
//GET ALL
router.get("/", getAirport);

export default router;
