import { storage } from '../utils/storage';

// The one demo number that shows live API data. Override with VITE_API_DEMO_PHONE.
// No secret — it is just a phone number, and it defaults to the known demo account.
export const DEMO_PHONE = import.meta.env.VITE_API_DEMO_PHONE || '9818979450';

export type DisplayMode = 'api' | 'figma';

/** Call after a successful login: api mode for the demo phone, figma for everyone else. */
export function saveModeForPhone(phone: string): void {
  storage.setMode(phone === DEMO_PHONE ? 'api' : 'figma');
}

/** Home and Detail read the current display mode through this small hook. */
export function useDisplayMode(): DisplayMode {
  return storage.getMode() === 'api' ? 'api' : 'figma';
}
