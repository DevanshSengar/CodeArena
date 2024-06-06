import userController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/check-auth", userController.checkAuth);
router.get("/check-username/:username", userController.checkUsernameExists);

export { router as userRouter };
