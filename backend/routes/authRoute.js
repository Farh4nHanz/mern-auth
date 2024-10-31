import e from "express";
import { authController } from "../controllers/authController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = e.Router();

router
  .post("/register", isAuth, authController.register)
  .post("/google", authController.googleAuth);

export default router;
