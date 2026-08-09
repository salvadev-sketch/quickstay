import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/owner/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner/*" element={<OwnerDashboard />} />
      </Routes>
      <footer className="border-t border-white/10 px-11 py-8 text-center text-slate text-[11px] font-mono">
        © 2026 QUICKSTAY
      </footer>
    </>
  );
}
