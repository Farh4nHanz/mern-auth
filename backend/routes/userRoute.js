import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const router = e.Router();

router.get("/", protect, userController.getAllUsers);

export default router;
