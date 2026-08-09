import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-11 py-6 border-b border-white/10 sticky top-0 bg-ink z-50">
      <Link to="/" className="font-display italic font-semibold text-xl flex items-center gap-2">
        <span className="text-brass not-italic">⌂</span> QuickStay
      </Link>
      <div className="flex items-center gap-7">
        <Link to="/hotels" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
          Hotels
        </Link>
        <SignedIn>
          <Link to="/my-bookings" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
            My Bookings
          </Link>
          <Link to="/owner" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
            Owner
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded border border-brass bg-brass text-ink">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
