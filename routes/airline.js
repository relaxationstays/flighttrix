import express from "express";
import {
  createAirline,
  getOneAirline,
  getAirline,
  updateAirline,
} from "../controllers/Airlines.js";

const router = express.Router();
//CREATE
router.post("/", createAirline);
//UPDATE
router.put("/:id", updateAirline);
//DELETE
//GET
router.get("/find/:id", getOneAirline);
//GET ALL
router.get("/", getAirline);

export default router;
