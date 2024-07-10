import express from "express";
import {
  createUser,
  // getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,
  login,
  getAllUsers,
  checklogin,
  setPass,
} from "../controllers/user.js";
import auth from "../middleware/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createUser);
router.get("/", auth, getAllUsers);
router.get("/getAll", getAllUsers);
router.post("/login", login);
router.post("/checklogin", checklogin);
router.post("/setPass", setPass);
router.get("/oneuser", auth, getUserById);
router.post("/updateUserById", updateUserById);
router.post("/delete", deleteUserById);
// router.post("/sendmail", emailPortal);

// router.post("/", verifyAdmin, createHotel);

export default router;
 