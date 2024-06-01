import {
  signup,
  login,
  logout,
  checkAuth,
  checkUsernameExists,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);
router.get("/check-username/:username", checkUsernameExists);

export { router as userRouter };
