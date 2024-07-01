import express from "express";
import {
  createCompany,
  // getAllCompanys,
  updateCompanyById,
  deleteCompanyById,
  getCompanyById,
  login,
  getAllCompanys,
  checklogin,
  setPass,
  emailPortal,
} from "../controllers/company.js";
import auth from "../middleware/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createCompany);
router.get("/", auth, getAllCompanys);
router.get("/getAll", getAllCompanys);
router.post("/login", login);
router.post("/checklogin", checklogin);
router.post("/setPass", setPass);
router.get("/oneuser", auth, getCompanyById);
router.post("/updateCompanyById", updateCompanyById);
router.post("/delete", deleteCompanyById);
// router.post("/sendmail", emailPortal);

// router.post("/", verifyAdmin, createHotel);

export default router;
