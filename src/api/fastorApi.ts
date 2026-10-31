import axios from 'axios';
import { storage } from '../utils/storage';

// Staging base URL comes from VITE_API_URL (.env) — no secrets in code.
const fastor = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Login returns { data: { token } }; the restaurant endpoint expects it as a Bearer token.
fastor.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Surface a plain message the pages show in their existing error spot (no stack traces).
fastor.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      new Error(
        error.response?.data?.message || error.message || 'Something went wrong'
      )
    )
);

// All POST bodies are application/x-www-form-urlencoded
const form = (fields: Record<string, string>) => new URLSearchParams(fields);

/** Step 1 — request an OTP on the phone. */
export async function sendOtp(phone: string): Promise<void> {
  await fastor.post('/v1/pwa/user/register', form({ phone, dial_code: '+91' }));
}

/** Step 2 — verify the OTP and return the token + user (staging accepts 123456). */
export async function verifyOtp(
  phone: string,
  otp: string
): Promise<{ token: string; name: string }> {
  const res = await fastor.post('/v1/pwa/user/login', form({ phone, otp, dial_code: '+91' }));
  const data = res.data?.data || {};
  if (!data.token) throw new Error('Invalid or expired OTP');
  return { token: data.token, name: data.user_name || '' };
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  address: string;
}

/** Restaurants for the city. The literal string "null" means a missing address. */
export async function getRestaurants(page = 1): Promise<Restaurant[]> {
  const res = await fastor.get('/v1/m/restaurant', {
    params: { city_id: 118, page_no: page },
  });
  const results = res.data?.data?.results || [];
  return results.map((r: any) => ({
    id: String(r.restaurant_id),
    name: r.restaurant_name || '',
    logo: r.logo || '',
    address: !r.address_complete || r.address_complete === 'null'
      ? 'Address not available'
      : r.address_complete,
  }));
}
