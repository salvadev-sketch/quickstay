import express from "express";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import { requireAuth, requireOwner } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireOwner);

// POST /api/owner/hotels - list a new property
router.post("/hotels", async (req, res) => {
  try {
    const hotel = await Hotel.create({ ...req.body, ownerId: req.ownerId });
    res.status(201).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/owner/hotels - this owner's properties
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.ownerId }).sort({ createdAt: -1 });
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/owner/bookings - bookings across this owner's properties
router.get("/bookings", async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.ownerId }).select("_id");
    const hotelIds = hotels.map((h) => h._id);

    const bookings = await Booking.find({ hotelId: { $in: hotelIds } })
      .populate("hotelId", "name")
      .sort({ checkIn: 1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
