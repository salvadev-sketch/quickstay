import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import HotelCard from "../components/HotelCard";
import heroImage from "../assets/roomImg1.png";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getHotels()
      .then((data) => setHotels(data.hotels || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center border-b border-white/10"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative max-w-[1140px] mx-auto px-11 pt-20 pb-14">
        <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-widest text-brass font-bold mb-5 before:content-[''] before:w-6 before:h-px before:bg-brass">
          Itinerary №0412 — Reserve a stay
        </div>
        <h1 className="text-5xl not-italic leading-tight max-w-xl mb-4 font-display italic font-semibold">
          Your gateway, held<br />at the front desk.
        </h1>
        <p className="text-slate max-w-md mb-9">
          Search handpicked properties the way a concierge tracks them — by date, by guest, confirmed on the spot.
        </p>

        <form onSubmit={handleSearch} className="flex bg-paper text-ink rounded max-w-xl overflow-hidden">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className="flex-1 px-5 py-4 text-sm outline-none bg-transparent"
          />
          <button className="bg-ink text-brass font-bold text-xs uppercase tracking-wide px-7">
            Search
          </button>
        </form>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-11 py-14">
        <div className="flex justify-between items-baseline mb-7">
          <h2 className="text-2xl">Featured stays</h2>
          <span className="font-mono text-slate text-[11px] uppercase not-italic">Handpicked, this season</span>
        </div>

        {loading && <p className="text-slate">Loading hotels…</p>}
        {error && <p className="text-red-400 text-sm">{error} — is the backend running?</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((h) => (
            <HotelCard key={h._id} hotel={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
