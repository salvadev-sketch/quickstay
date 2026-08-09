import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../../lib/api";

function DashboardHome() {
  const { getToken } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const [h, b] = await Promise.all([api.getOwnerHotels(token), api.getOwnerBookings(token)]);
      setHotels(h.hotels || []);
      setBookings(b.bookings || []);
    })();
  }, [getToken]);

  return (
    <div>
      <h2 className="text-2xl mb-6">Owner Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <Stat label="Properties" value={hotels.length} />
        <Stat label="Bookings" value={bookings.length} />
        <Stat label="Paid" value={bookings.filter((b) => b.paymentStatus === "Paid").length} />
      </div>
      <h3 className="text-lg mb-3 not-italic font-semibold">Recent bookings</h3>
      <div className="space-y-2">
        {bookings.slice(0, 6).map((b) => (
          <div key={b._id} className="flex justify-between border-b border-white/10 py-2 text-sm not-italic">
            <span>{b.hotelId?.name}</span>
            <span className="font-mono text-brass">${b.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-white/10 rounded p-5">
      <div className="text-3xl font-mono text-brass">{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate mt-1">{label}</div>
    </div>
  );
}

export default function OwnerDashboard() {
  return (
    <div className="max-w-[1140px] mx-auto px-11 py-14 grid grid-cols-[190px_1fr] gap-14">
      <nav className="text-sm space-y-1">
        <Link to="" className="block py-2 text-slate font-semibold hover:text-brass">Dashboard</Link>
      </nav>
      <Routes>
        <Route index element={<DashboardHome />} />
      </Routes>
    </div>
  );
}
