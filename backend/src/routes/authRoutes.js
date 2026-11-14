import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";

const router = express.Router();


router.use("/register",registerUser)
router.use("/login",loginUser)

export default router;