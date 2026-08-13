import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";

const FALLBACK_IMAGES = [roomImg1, roomImg2, roomImg3, roomImg4];

// Uses the hotel's real image if the backend has one; otherwise picks a
// stable fallback photo so the same hotel always shows the same image.
export function getHotelImage(hotel) {
  if (hotel?.images?.length) return hotel.images[0];

  const key = hotel?._id?.toString() || hotel?.name || "";
  let sum = 0;
  for (let i = 0; i < key.length; i++) sum += key.charCodeAt(i);

  return FALLBACK_IMAGES[sum % FALLBACK_IMAGES.length];
}
