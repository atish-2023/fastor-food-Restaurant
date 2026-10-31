/**
 * Format price with specified currency symbol and 2 decimal places
 */
export function formatPrice(amount: number, currency: '₹' | '$' = '₹'): string {
  return `${currency}${amount.toFixed(2)}`;
}
