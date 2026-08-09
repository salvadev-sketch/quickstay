import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import HotelCard from "../components/HotelCard";

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getHotels(destination ? { destination } : {})
      .then((data) => setHotels(data.hotels || []))
      .finally(() => setLoading(false));
  }, [destination]);

  return (
    <div className="max-w-[1140px] mx-auto px-11 py-14">
      <div className="flex justify-between items-baseline mb-7">
        <h2 className="text-2xl">{destination ? `Stays in "${destination}"` : "All stays"}</h2>
        <span className="font-mono text-slate text-[11px] uppercase not-italic">{hotels.length} results</span>
      </div>

      {loading && <p className="text-slate">Loading…</p>}
      {!loading && hotels.length === 0 && (
        <p className="text-slate">No hotels found. Try a different destination.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((h) => (
          <HotelCard key={h._id} hotel={h} />
        ))}
      </div>
    </div>
  );
}
