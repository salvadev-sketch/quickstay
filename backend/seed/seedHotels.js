import "dotenv/config";
import connectDB from "../config/db.js";
import Hotel from "../models/Hotel.js";

const sampleHotels = [
  {
    name: "Urbanza Suites",
    description: "The BMW X5-of-hotels — mid-size luxury, unbeatable comfort.",
    location: "Main Road 123 Street, 23 Colony",
    pricePerNight: 399,
    rating: 4.5,
    images: [],
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    ownerId: "seed_owner_1",
    isBestSeller: true,
  },
  {
    name: "Urbanza Suites — Double",
    description: "Cozy double room with a relaxed, modern feel.",
    location: "Main Road 123 Street, 23 Colony",
    pricePerNight: 299,
    rating: 4.5,
    images: [],
    amenities: ["Room Service", "City View"],
    ownerId: "seed_owner_1",
    isBestSeller: false,
  },
  {
    name: "Urbanza Suites — Deluxe",
    description: "Deluxe suite with premium finishes and skyline views.",
    location: "Main Road 123 Street, 23 Colony",
    pricePerNight: 199,
    rating: 4.5,
    images: [],
    amenities: ["Room Service", "Skyline View"],
    ownerId: "seed_owner_1",
    isBestSeller: true,
  },
];

const run = async () => {
  await connectDB();
  await Hotel.deleteMany({});
  await Hotel.insertMany(sampleHotels);
  console.log(`Seeded ${sampleHotels.length} hotels`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
