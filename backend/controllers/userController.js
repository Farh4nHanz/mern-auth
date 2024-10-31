import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import CustomError from "../middleware/errorMiddleware.js";
import mongoose from "mongoose";

class UserController {
  getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.status(200).json({ success: true, users: users });
    } catch (err) {
      console.error(err);
      throw new CustomError("Cannot get all users! Try again later.", 500);
    }
  });
}

export const userController = new UserController();
