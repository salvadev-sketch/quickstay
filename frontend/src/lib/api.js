const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  // Public
  getHotels: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/hotels${qs ? `?${qs}` : ""}`);
  },
  getHotel: (id) => request(`/hotels/${id}`),
  checkAvailability: (id, checkIn, checkOut) =>
    request(`/hotels/${id}/availability?checkIn=${checkIn}&checkOut=${checkOut}`),

  // Guest (auth required)
  createBooking: (payload, token) => request("/bookings", { method: "POST", body: payload, token }),
  getMyBookings: (token) => request("/bookings/my", { token }),
  checkout: (bookingId, token) => request(`/bookings/${bookingId}/checkout`, { method: "POST", token }),

  // Owner (auth + owner role required)
  getOwnerHotels: (token) => request("/owner/hotels", { token }),
  addHotel: (payload, token) => request("/owner/hotels", { method: "POST", body: payload, token }),
  getOwnerBookings: (token) => request("/owner/bookings", { token }),
};
