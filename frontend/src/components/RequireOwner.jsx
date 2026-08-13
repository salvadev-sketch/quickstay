import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

// Wraps a route that should only be reachable by users with the
// "owner" role in Clerk's public metadata. Anyone else (including
// signed-out users) is redirected to the homepage.
export default function RequireOwner({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // avoid a flash-redirect before Clerk finishes loading

  const isOwner = user?.publicMetadata?.role === "owner";
  if (!isOwner) return <Navigate to="/" replace />;

  return children;
}
