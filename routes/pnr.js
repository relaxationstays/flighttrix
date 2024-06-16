import express from "express";
import {
  createPNR,
  deletePNR,
  getPNR,
  updatePNR,
  getPNRS,
} from "../controllers/PNR.js";

const router = express.Router();
//CREATE
router.post("/", createPNR);
router.get("/", getPNRS);
//UPDATE
router.put("/:id", updatePNR);
//DELETE
router.delete("/:id", deletePNR);
//GET
router.get("/find/:id", getPNR);
//GET ALL

export default router;
