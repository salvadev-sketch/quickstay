import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// GET /api/hotels - list/search hotels
router.get("/", async (req, res) => {
  try {
    const { destination, guests } = req.query;
    const filter = {};
    if (destination) filter.location = { $regex: destination, $options: "i" };

    const hotels = await Hotel.find(filter).sort({ isBestSeller: -1, createdAt: -1 });
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/hotels/:id - hotel detail
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/hotels/:id/availability?checkIn=&checkOut=
router.get("/:id/availability", async (req, res) => {
  try {
    const Booking = (await import("../models/Booking.js")).default;
    const { checkIn, checkOut } = req.query;

    const overlapping = await Booking.findOne({
      hotelId: req.params.id,
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });

    res.json({ success: true, available: !overlapping });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
