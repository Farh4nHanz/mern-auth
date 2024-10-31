import e from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";;

// database
import { connectDB } from "./config/db.js";

const app = e();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser());

process.env.NODE_ENV === "development"
  ? app.use(logger("dev"))
  : app.use(
      logger("combined", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
      })
    );

// middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("*", notFound);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(e.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(errorHandler); // handling error

app.listen(PORT, "0.0.0.0", async () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});