import asyncHandler from "express-async-handler";
import CustomError from "./errorMiddleware.js";
import admin from "../config/firebase.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new CustomError("Unauthorized! Please log in first.", 401);

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    throw new CustomError("Invalid token!", 403);
  }
});

export const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    return res.status(200).json({
      message: "Already authenticated!",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    throw new CustomError("Invalid token!", 403);
  }
});
