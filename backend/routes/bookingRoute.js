import express from "express";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import stripe from "../config/stripe.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/bookings - create a booking (Unpaid until Stripe confirms)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.body;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

    const nights = Math.max(
      1,
      Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    );

    const booking = await Booking.create({
      userId: req.auth.userId,
      hotelId,
      checkIn,
      checkOut,
      guests,
      total: hotel.pricePerNight * nights,
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings/my - guest's own bookings
router.get("/my", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.auth.userId })
      .populate("hotelId", "name location images")
      .sort({ checkIn: 1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookings/:id/checkout - create a Stripe Checkout session
router.post("/:id/checkout", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.auth.userId }).populate("hotelId");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: booking.hotelId.name },
            unit_amount: booking.total * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/my-bookings?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/my-bookings?success=false`,
      metadata: { bookingId: booking._id.toString() },
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookings/stripe-webhook - Stripe webhook to mark bookings Paid
router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await Booking.findByIdAndUpdate(session.metadata.bookingId, { paymentStatus: "Paid" });
  }

  res.json({ received: true });
});

export default router;
