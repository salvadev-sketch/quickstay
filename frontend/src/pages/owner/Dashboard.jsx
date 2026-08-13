import { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
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

function AddHotel() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    pricePerNight: "",
    amenities: "",
    isBestSeller: false,
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.name || !form.description || !form.location || !form.pricePerNight) {
      setStatus("Please fill in name, description, location, and price.");
      return;
    }

    setSubmitting(true);
    try {
      const token = await getToken();
      await api.addHotel(
        {
          name: form.name,
          description: form.description,
          location: form.location,
          pricePerNight: Number(form.pricePerNight),
          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          isBestSeller: form.isBestSeller,
        },
        token
      );
      navigate("..");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-white/10 rounded px-3 py-2.5 text-sm outline-none focus:border-brass";

  return (
    <div>
      <h2 className="text-2xl mb-6">Add Property</h2>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block font-mono text-[10px] uppercase text-slate mb-1.5">Name</label>
          <input value={form.name} onChange={update("name")} className={inputClass} placeholder="Urbanza Suites" />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase text-slate mb-1.5">Location</label>
          <input value={form.location} onChange={update("location")} className={inputClass} placeholder="Kigali, Rwanda" />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase text-slate mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={update("description")}
            className={inputClass}
            rows={3}
            placeholder="A short description of the property"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase text-slate mb-1.5">Price per night ($)</label>
          <input
            type="number"
            min="0"
            value={form.pricePerNight}
            onChange={update("pricePerNight")}
            className={inputClass}
            placeholder="120"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase text-slate mb-1.5">
            Amenities <span className="normal-case text-slate/60">(comma separated)</span>
          </label>
          <input
            value={form.amenities}
            onChange={update("amenities")}
            className={inputClass}
            placeholder="Pool Access, Room Service, Mountain View"
          />
        </div>
        <label className="flex items-center gap-2 text-sm not-italic">
          <input type="checkbox" checked={form.isBestSeller} onChange={update("isBestSeller")} />
          Mark as Best Seller
        </label>

        {status && <p className="text-red-400 text-xs not-italic">{status}</p>}

        <button
          disabled={submitting}
          className="bg-brass text-ink font-bold text-xs uppercase tracking-wide px-7 py-3 rounded disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add Property"}
        </button>
      </form>
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
        <Link to="add-hotel" className="block py-2 text-slate font-semibold hover:text-brass">Add Property</Link>
      </nav>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="add-hotel" element={<AddHotel />} />
      </Routes>
    </div>
  );
}
