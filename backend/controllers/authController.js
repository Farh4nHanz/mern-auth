import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import CustomError from "../middleware/errorMiddleware.js";

class AuthController {
  validateRegister = asyncHandler((req) => {
    const { displayName, email } = req.body;
    const allowedFields = [
      "displayName",
      "email",
      "emailVerified",
      "phoneNumber",
      "photoURL",
    ];

    if (!Object.keys(req.body).every((key) => allowedFields.includes(key)))
      throw new CustomError("Invalid field name!", 400);

    if (!displayName || !email)
      throw new CustomError("Please fill all field!", 400);
  });

  register = asyncHandler(async (req, res) => {
    this.validateRegister(req);

    const { email } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist)
      throw new CustomError(`User with email ${email} already exist.`, 400);

    try {
      const newUser = new UserModel(req.body);

      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "Registration success!",
        user: newUser,
      });
    } catch (err) {
      console.error(err);
      throw new CustomError("Something went wrong! Try again later.", 500);
    }
  });

  googleAuth = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      try {
        const newGoogleUser = new UserModel(req.body);

        await newGoogleUser.save();
        return res.status(201).json({
          success: true,
          user: newGoogleUser,
        });
      } catch (err) {
        console.error(err);
        throw new CustomError("Something went wrong! Try again later.", 500);
      }
    }
  });
}

export const authController = new AuthController();
