import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB:", mongoose.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
