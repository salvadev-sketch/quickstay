import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    images: [{ type: String }],
    amenities: [{ type: String }], // e.g. Room Service, Mountain View, Pool Access
    ownerId: { type: String, required: true }, // Clerk user id
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
