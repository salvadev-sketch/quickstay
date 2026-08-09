import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user id (guest)
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, default: 1 },
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
