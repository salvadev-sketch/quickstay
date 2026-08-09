import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { api } from "../lib/api";

export default function HotelDetail() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.getHotel(id).then((data) => setHotel(data.hotel));
  }, [id]);

  const handleBook = async () => {
    if (!checkIn || !checkOut) {
      setStatus("Please choose check-in and check-out dates.");
      return;
    }
    setStatus("Booking…");
    try {
      const token = await getToken();
      const { booking } = await api.createBooking(
        { hotelId: id, checkIn, checkOut, guests },
        token
      );
      const { url } = await api.checkout(booking._id, token);
      window.location.href = url; // redirect to Stripe Checkout
    } catch (err) {
      setStatus(err.message);
    }
  };

  if (!hotel) return <div className="max-w-[1140px] mx-auto px-11 py-14 text-slate">Loading…</div>;

  return (
    <div className="max-w-[1140px] mx-auto px-11 py-14">
      <div className="flex justify-center">
        <div className="bg-paper text-ink w-full max-w-md rounded overflow-hidden">
          <div className="h-36 bg-gradient-to-br from-brass to-brass-deep" />
          <div className="p-7">
            <h3 className="text-xl mb-1">{hotel.name}</h3>
            <p className="text-sm text-ink/60 mb-4 not-italic">{hotel.location}</p>
            <p className="text-sm mb-5 not-italic">{hotel.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="border border-paper-dim rounded p-2.5">
                <label className="block font-mono text-[9px] uppercase text-brass-deep mb-1">Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm outline-none" />
              </div>
              <div className="border border-paper-dim rounded p-2.5">
                <label className="block font-mono text-[9px] uppercase text-brass-deep mb-1">Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm outline-none" />
              </div>
            </div>
            <div className="border border-paper-dim rounded p-2.5 mb-4">
              <label className="block font-mono text-[9px] uppercase text-brass-deep mb-1">Guests</label>
              <input type="number" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full text-sm outline-none" />
            </div>

            <SignedIn>
              <button
                onClick={handleBook}
                className="w-full bg-brass text-ink font-bold text-xs uppercase tracking-wide py-3 rounded"
              >
                Reserve — ${hotel.pricePerNight}/night
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-brass text-ink font-bold text-xs uppercase tracking-wide py-3 rounded">
                  Sign in to reserve
                </button>
              </SignInButton>
            </SignedOut>

            {status && <p className="text-xs mt-3 not-italic">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
