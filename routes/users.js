import express from "express";
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  login,
  emailPortal,
} from "../controllers/user.js";
const router = express.Router();

//CREATE
router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/login", login);
router.post("/updateUserById", updateUserById);
router.post("/delete", deleteUserById);
// router.post("/sendmail", emailPortal);

// router.post("/", verifyAdmin, createHotel);

export default router;
