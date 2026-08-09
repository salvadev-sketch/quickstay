# QuickStay

Hotel booking web app — guest site + property dashboard.

## Status: Frontend + backend built

- `prototype/index.html` — the original static mockup (kept for reference)
- `frontend/` — real React (Vite + Tailwind) app, wired to the backend API
- `backend/` — real Express + MongoDB + Stripe API

Planned UX (from the project walkthrough):

- Home with featured destinations, search (destination, check-in/out, guests)
- Hotel detail page with availability check and booking
- Clerk-powered sign in (Google OAuth + email)
- Guest profile with My Bookings (paid / unpaid status)
- Stripe checkout for payments
- Property owner dashboard

## Done ✅

- ✅ Repo created
- ✅ README documented
- ✅ Interactive frontend prototype (Concierge-style, no backend)
- ✅ Frontend assets uploaded (icons, images, logo)
- ✅ Express + MongoDB + Stripe backend (`/backend`)
- ✅ Real React frontend (`/frontend`) — Home, Hotels search, Hotel detail + booking, My Bookings, Owner dashboard, Clerk auth, wired to the live API

## Frontend

```
frontend/
├── src/
│   ├── lib/api.js         # fetch wrapper for the backend
│   ├── components/
│   │   ├── Navbar.jsx       # Clerk sign-in/user button
│   │   └── HotelCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Hotels.jsx        # search results
│   │   ├── HotelDetail.jsx   # booking + Stripe checkout
│   │   ├── MyBookings.jsx
│   │   └── owner/Dashboard.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js     # Concierge design tokens (ink/paper/brass)
└── vite.config.js
```

### Run locally

```bash
cd frontend
cp .env.example .env   # set VITE_CLERK_PUBLISHABLE_KEY + VITE_API_BASE_URL
npm install
npm run dev
```

Run the backend (`/backend`) alongside it — see its own README section for setup.

## Backend

```
backend/
├── config/       # db.js (MongoDB), stripe.js
├── middleware/   # auth.js (Clerk + owner role check)
├── models/       # Hotel.js, Booking.js
├── routes/       # hotelRoute.js, bookingRoute.js, ownerRoute.js
├── seed/         # seedHotels.js
└── server.js
```

### Run locally

```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, Clerk keys, Stripe keys, client URL
npm install
npm run seed             # optional: load sample hotels
npm run dev
```

## Stack

- Frontend: React + Vite + Tailwind ✅
- Backend: Node/Express + MongoDB ✅
- Auth: Clerk
- Payments: Stripe ✅

## Next steps

- Add owner-side "Add hotel" form + manage bookings UI
- Connect real Clerk keys and test the full auth flow
- Deploy backend (Render/Railway) + frontend (Vercel)
