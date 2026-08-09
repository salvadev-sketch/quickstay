import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../lib/api";

export default function MyBookings() {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const data = await api.getMyBookings(token);
        setBookings(data.bookings || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken]);

  return (
    <div className="max-w-[1140px] mx-auto px-11 py-14">
      <h2 className="text-2xl mb-8">My Bookings</h2>

      {loading && <p className="text-slate">Loading…</p>}
      {!loading && bookings.length === 0 && <p className="text-slate">No bookings yet.</p>}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="flex justify-between items-center border border-white/10 rounded p-5">
            <div>
              <h3 className="text-base not-italic font-semibold">{b.hotelId?.name}</h3>
              <p className="text-slate text-xs not-italic">{b.hotelId?.location}</p>
            </div>
            <div className="text-xs text-slate not-italic text-right">
              <div>{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</div>
              <div className="mt-1 font-mono text-brass">${b.total}</div>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] uppercase ${b.paymentStatus === "Paid" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                {b.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
