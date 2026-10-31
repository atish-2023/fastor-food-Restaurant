// Figma sample content shown in "figma" display mode (any non-demo phone).
// These are the exact Figma frames, using the existing local images in
// public/assets. No API call is made for the lists in this mode.

// Best Seller (order + prices match the Figma frame):
//   sushi (fastor-4), lasagna (fastor-5), curry bowl (fastor-8), cupcake (fastor-9)
export const FIGMA_BEST_SELLERS = [
  { id: 'fig-b1', name: 'Sushi', image: '/assets/fastor-4.png', fallback: '/assets/fastor-4.png', priceLabel: '₹103.0', address: '' },
  { id: 'fig-b2', name: 'Lasagna', image: '/assets/fastor-5.png', fallback: '/assets/fastor-5.png', priceLabel: '₹50.0', address: '' },
  { id: 'fig-b3', name: 'Curry Bowl', image: '/assets/fastor-8.png', fallback: '/assets/fastor-8.png', priceLabel: '₹12.99', address: '' },
  { id: 'fig-b4', name: 'Cupcake with Berries', image: '/assets/fastor-9.png', fallback: '/assets/fastor-9.png', priceLabel: '₹8.20', address: '' },
];

// Popular Items: Strawberry Shake (fastor-6) and Chicken Burger (fastor-7).
export const FIGMA_ORDERS = [
  { id: 'fig-o1', name: 'Strawberry Shake', image: '/assets/fastor-6.png', fallback: '/assets/fastor-6.png', date: '29 Nov, 01:20 pm', itemsCount: 2, price: 20.0, currency: '₹', status: 'active', address: '' },
  { id: 'fig-o2', name: 'Chicken Burger', image: '/assets/fastor-7.png', fallback: '/assets/fastor-7.png', date: '17 Oct, 01:20 pm', itemsCount: 1, price: 20.0, currency: '₹', status: 'active', address: '' },
];

// Item Detail (opened from either card): landscape pizza (fastor-10), Lorem ipsum text,
// fixed portions with Jumbo selected by default.
export const FIGMA_DETAIL = {
  id: 'fig-detail',
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

export const FIGMA_NAME = 'Karan';
export const FIGMA_LOCATION = 'Model Town, New Delhi';
