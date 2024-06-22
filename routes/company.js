import express from "express";
import {
  createCompany,
  getAllCompanys,
  updateCompanyById,
  deleteCompanyById,
  getCompanyById,
  login,
  emailPortal,
} from "../controllers/company.js";
const router = express.Router();

//CREATE
router.post("/", createCompany);
router.get("/", getAllCompanys);
router.post("/login", login);
router.get("/:id", getCompanyById);
router.post("/updateCompanyById", updateCompanyById);
router.post("/delete", deleteCompanyById);
// router.post("/sendmail", emailPortal);

// router.post("/", verifyAdmin, createHotel);

export default router;
