import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import companysRoute from "./routes/company.js";
import usersRoute from "./routes/users.js";
import pnrRoute from "./routes/pnr.js";
import bookingRoute from "./routes/booking.js";
import airportRoute from "./routes/airport.js";
import airlineRoute from "./routes/airline.js";
import PaymentRoute from "./routes/payment.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./middleware/verifyToken.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://flightrix.com",
      "https://admin.flightrix.com",
      "https://jolly-mandazi-3b4a00.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  })
);
app.use(express.json());

// app.use("/api/user", authRoute);
app.use("/api/pnr", auth, pnrRoute);
app.use("/api/user", usersRoute);
app.use("/api/company", companysRoute);
app.use("/api/booking", auth, bookingRoute);
app.use("/api/airport", auth, airportRoute);
app.use("/api/airline", auth, airlineRoute);
app.use("/api/payment",auth, PaymentRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
