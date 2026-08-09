import { clerkClient } from "@clerk/clerk-sdk-node";

// Verifies the Clerk session token on protected routes
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const session = await clerkClient.verifyToken(token);

    req.auth = { userId: session.sub };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired session" });
  }
};

// Restricts a route to users with the "owner" role in Clerk's public metadata
export const requireOwner = async (req, res, next) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    if (user.publicMetadata?.role !== "owner") {
      return res.status(403).json({ success: false, message: "Property owner access only" });
    }
    req.ownerId = req.auth.userId;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
