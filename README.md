# Fastor — Mobile Food App (React)

A mobile-first React + Vite app (Sign Up, 6-digit code, Home, Item detail). It talks
**only** to the company's staging API. There is no local backend anymore.

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env` (it already contains `VITE_API_URL`).
3. `npm run dev` → http://localhost:3000

## Staging API (src/api/fastorApi.ts)

Base URL from `VITE_API_URL=https://staging.fastor.ai`. All POST bodies use
`application/x-www-form-urlencoded` (via `URLSearchParams`). Staging returns
`Access-Control-Allow-Origin: *`, so calls work directly and no Vite proxy is needed.

| Screen | Endpoint | Notes |
| --- | --- | --- |
| Sign Up | `POST /v1/pwa/user/register` | `phone`, `dial_code=+91`. Navigates to `/otp` only on success. |
| 6-digit code | `POST /v1/pwa/user/login` | `phone`, `otp`, `dial_code`. Token read from `data.token`, saved in localStorage (`fastor_auth_token`). Resend calls register and restarts the 30s timer. |
| Home / Detail | `GET /v1/m/restaurant?city_id=118&page_no=N` | Sent with `Authorization: Bearer <token>`. |

## What is API data vs static

- **From the API:** restaurant `logo` (→ card image), `restaurant_name` (→ card title),
  `address_complete` (→ Item-detail description). The literal string `"null"` is treated
  as missing and shown as "Address not available". The logged-in user's `user_name` from
  the login response fills the greeting card (falls back to "Guest").
- **Still static placeholders:** prices, dates, item counts and portion options — the
  restaurant endpoint does not return them (see the comments in `src/api/foodApi.ts`).

## Display modes

The staging restaurant endpoint returns **no prices** (only name, logo and address), so a
live-API Home can never match the Figma mock-up exactly. The app therefore has two display
modes, chosen once at login and stored in `localStorage` (`fastor_display_mode`):

- **`api` mode** — logging in with the demo phone (`VITE_API_DEMO_PHONE`, default
  `9818979450`) shows live staging data: restaurants in Best Seller / Popular Items, the
  real `user_name` in the greeting card, and the tapped restaurant on Item detail.
- **`figma` mode** — any other phone shows the exact Figma sample content from
  `src/data/figmaSample.js` (Karan, the four Best Seller dishes, Strawberry Shake and
  Chicken Burger, and the pizza/Lorem-ipsum detail). No list API call is made in this mode,
  so the design can be reviewed pixel-for-pixel.

Auth and route guards are identical in both modes (no token → Sign Up), the real register +
login API calls always run, and logout clears the mode. The mode is read through the small
`useDisplayMode` hook (`src/hooks/useDisplayMode.ts`); only the data passed into the existing
components changes — never their layout or styling.

## Assumptions

- Fixed India dial code `+91` and `city_id=118` (Delhi).
- Pagination param is `page_no` (verified against staging — `page`/`limit`/`offset` are ignored);
  only page 1 is loaded because a "load more" control would require new UI.
- The Best Seller / Popular Items card markup has no slot for an address, so the API
  address is surfaced on the Item-detail description (an existing element) — no visual
  elements were added, per the "logic-only, no UI change" rule.
- `/home` and `/detail` are guarded on the localStorage token and redirect to `/signup`
  when missing. `logout()` in `src/hooks/useAuth.ts` clears the token (there is no logout
  button in the Figma UI, so none was added).
- Staging accepts the fixed OTP `123456`; it is logged to the console in dev only.

## Project structure

```
fastor-food/
├── index.html                 # loads /src/main.tsx + Google Fonts
├── package.json               # scripts: dev, build, preview, clean, lint
├── vite.config.ts             # React + Tailwind v4 plugins, port 3000
├── tsconfig.json              # allowJs (so figmaSample.js imports into .tsx)
├── .env / .env.example        # VITE_API_URL, VITE_API_DEMO_PHONE (.env is gitignored)
├── metadata.json              # AI Studio project metadata
└── src/
    ├── main.tsx → App.tsx → routes/AppRoutes.tsx   # entry + router + RequireAuth guard
    ├── api/        fastorApi.ts (staging client) · foodApi.ts (mappers + statics)
    ├── data/       figmaSample.js (figma-mode content)
    ├── hooks/      useAuth.ts · useDisplayMode.ts · useCountdown.ts
    ├── utils/      storage.ts (token/user/mode) · formatPrice.ts
    ├── pages/      PhonePage · OtpPage · HomePage · ItemDetailPage
    │               (+ CrmApiDocsPage · FigmaGalleryPage — extra routed demo pages)
    ├── components/ auth/ · common/ (SafeImage, Button, Toast, StatusBar, …)
    │               home/ (BestSellerCard, OrderCard, PromoBanner, UserCard, …)
    │               detail/ (PortionSelector, QuantityStepper)
    ├── styles/     global.css + variables.css (imported via index.css)
    └── index.css   # @import tailwindcss + global.css
public/assets/    fastor-1 … fastor-10.png  (every file referenced)
crm-backend/      separate CRM API project (own package.json) — to live in its own repo
```
