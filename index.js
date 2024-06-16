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
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./middleware/verifyToken.js";

import bodyParser from "body-parser";

// Start the server
const PORT = process.env.PORT || 8800;

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

//middlewares

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   next();
// });

app.use(cors());

/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// app.use("/api/user", authRoute);
app.use("/api/pnr", auth, pnrRoute);
app.use("/api/user", usersRoute);
app.use("/api/company", companysRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/airport", auth, airportRoute);
app.use("/api/airline", airlineRoute);

// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// });
// app.use("/api/", roomsRoute);

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

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});
