import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import hotelRoute from "./routes/hotelRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import ownerRoute from "./routes/ownerRoute.js";

const app = express();

app.use(cors());

// Stripe webhook needs the raw body, so mount it before express.json()
app.use("/api/bookings/stripe-webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.get("/", (req, res) => res.send("QuickStay API is running"));

app.use("/api/hotels", hotelRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/owner", ownerRoute);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
