# QuickStay

Hotel booking web app — guest site + property dashboard.

## Status: In progress (backend built, frontend still a prototype)

- `prototype/index.html` — static, interactive front-end prototype (no real backend calls yet)
- `backend/` — real Express + MongoDB + Stripe API

Planned UX (from the project walkthrough):

- Home with featured destinations, search (destination, check-in/out, guests)
- Exclusive offers and guest testimonials
- Hotel detail page with photo gallery and availability check
- Clerk-powered sign in (Google OAuth + email)
- Guest profile with My Bookings (paid / unpaid status)
- Stripe checkout for payments
- Property owner dashboard

## Done ✅

- ✅ Repo created
- ✅ README documented
- ✅ Interactive frontend prototype (Concierge-style, no backend)
- ✅ Frontend assets uploaded (icons, images, logo)
- ✅ Express + MongoDB + Stripe backend (`/backend`) — hotels, bookings, availability check, checkout, owner dashboard, Clerk auth middleware, seed script

## Backend

```
backend/
├── config/
│   ├── db.js         # MongoDB connection
│   └── stripe.js      # Stripe client
├── middleware/
│   └── auth.js         # Clerk auth + owner role check
├── models/
│   ├── Hotel.js
│   └── Booking.js
├── routes/
│   ├── hotelRoute.js    # public hotel listing/search + availability
│   ├── bookingRoute.js  # create booking, my bookings, Stripe checkout + webhook
│   └── ownerRoute.js    # add/manage hotels, view bookings
├── seed/
│   └── seedHotels.js
└── server.js
```

### Run locally

```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, Clerk keys, Stripe keys, client URL
npm install
npm run seed            # optional: load sample hotels
npm run dev
```

## Planned stack

- Frontend: React
- Backend: Node/Express + MongoDB ✅
- Auth: Clerk
- Payments: Stripe ✅

## Next steps

- Build real React frontend (replace static prototype), wire it to the API
- Connect Clerk auth on the frontend (guest + owner roles)
- Deploy backend (Render/Railway) + frontend (Vercel)
