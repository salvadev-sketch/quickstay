import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const { user } = useUser();
  const isOwner = user?.publicMetadata?.role === "owner";

  return (
    <nav className="flex items-center justify-between px-11 py-6 border-b border-white/10 sticky top-0 bg-ink z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="QuickStay" className="h-[22px] w-auto" />
      </Link>
      <div className="flex items-center gap-7">
        <Link to="/hotels" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
          Hotels
        </Link>
        <SignedIn>
          <Link to="/my-bookings" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
            My Bookings
          </Link>
          {isOwner && (
            <Link to="/owner" className="text-xs uppercase tracking-widest text-slate font-bold hover:text-brass">
              Owner
            </Link>
          )}
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
