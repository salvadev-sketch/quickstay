import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="block bg-ink-raised border border-white/10 rounded overflow-hidden hover:-translate-y-1 hover:border-brass transition-all"
    >
      <div className="h-40 bg-gradient-to-br from-[#1c3f3c] to-ink flex items-center justify-center relative">
        {hotel.isBestSeller && (
          <span className="absolute top-3 left-3 bg-brass text-ink text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide">
            Best Seller
          </span>
        )}
        <span className="font-mono text-[11px] text-slate tracking-wide">ROOM PREVIEW</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-display italic mb-1">{hotel.name}</h3>
        <p className="text-slate text-xs mb-3 not-italic">{hotel.location}</p>
        <div className="flex justify-between items-center">
          <span className="font-mono text-brass text-sm">${hotel.pricePerNight}/night</span>
          <span className="text-brass text-xs">★ {hotel.rating}</span>
        </div>
      </div>
    </Link>
  );
}
