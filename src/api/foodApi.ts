import { Restaurant } from './fastorApi';

export interface BestSellerItem {
  id: string;
  name: string;
  image: string;
  /** Local food photo shown when the API logo is missing/broken. */
  fallback: string;
  /** Static placeholder — the restaurant API returns no prices */
  priceLabel: string;
  address: string;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  /** Local food photo shown when the API logo is missing/broken. */
  fallback: string;
  /** Static placeholder — the restaurant API returns no dates */
  date: string;
  /** Static placeholder — the restaurant API returns no item counts */
  itemsCount: number;
  price: number;
  currency: '₹';
  status: 'active' | 'cancelled' | 'delivered';
  address: string;
}

export interface PortionOption {
  id: string;
  name: string;
  slices: string;
  additionalPrice: number;
  currency: '$';
}

export interface FoodDetail {
  id: string;
  name: string;
  address: string;
  basePrice: number;
  currency: '₹';
  description: string;
  image: string;
  fallback: string;
  portions: PortionOption[];
}

// Static placeholder price labels (from the Figma cards) — the API does not return prices.
const PRICE_LABELS = ['₹103.0', '₹50.0', '₹12.99', '₹8.20'];

// Local food photos (from public/assets) used as per-card fallbacks so the rows
// look like the Figma design even though the staging API returns one broken logo.
const BESTSELLER_IMAGES = ['/assets/fastor-4.png', '/assets/fastor-5.png', '/assets/fastor-8.png', '/assets/fastor-9.png'];
const ORDER_IMAGES = ['/assets/fastor-6.png', '/assets/fastor-7.png'];

/** Best Seller cards: first 4 API results; logo -> image, restaurant_name -> name. Price stays a static placeholder. */
export function toBestSellers(restaurants: Restaurant[]): BestSellerItem[] {
  return restaurants.slice(0, 4).map((r, i) => ({
    id: r.id,
    name: r.name,
    image: r.logo,
    fallback: BESTSELLER_IMAGES[i % BESTSELLER_IMAGES.length],
    address: r.address,
    priceLabel: PRICE_LABELS[i % PRICE_LABELS.length], // static placeholder
  }));
}

/** Popular Items cards: logo + name from API; date/price/count stay static placeholders. */
export function toOrders(restaurants: Restaurant[]): OrderItem[] {
  return restaurants.slice(0, 2).map((r, i) => ({
    id: r.id,
    name: r.name,
    image: r.logo,
    fallback: ORDER_IMAGES[i % ORDER_IMAGES.length],
    address: r.address,
    date: '29 Nov, 01:20 pm', // static placeholder
    itemsCount: 2, // static placeholder
    price: 20.0, // static placeholder
    currency: '₹',
    status: 'active',
  }));
}

// Item-detail fallback content. Portions, price and description are static —
// the restaurant API only returns name / logo / address.
export const PIZZA_DETAIL: FoodDetail = {
  id: 'item-pizza-1',
  name: 'Lorem ipsum dolor sit amet',
  address: 'Model Town, New Delhi',
  basePrice: 14.0,
  currency: '₹',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  image: '/assets/fastor-10.png',
  fallback: '/assets/fastor-10.png',
  portions: [
    { id: 'personal', name: 'Personal', slices: '4 Slides', additionalPrice: 0.0, currency: '$' },
    { id: 'medium', name: 'Medium', slices: '8 Slides', additionalPrice: 3.0, currency: '$' },
    { id: 'familiar', name: 'Familiar', slices: '10 Slides', additionalPrice: 6.0, currency: '$' },
    { id: 'jumbo', name: 'Jumbo', slices: '12 Slides', additionalPrice: 10.0, currency: '$' },
  ],
};
