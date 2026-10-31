const TOKEN_KEY = 'fastor_auth_token';
const USER_KEY = 'fastor_user_info';
const PHONE_KEY = 'fastor_pending_phone';
const MODE_KEY = 'fastor_display_mode';

export const storage = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn('Failed to save auth token to localStorage', e);
    }
  },

  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to remove auth token', e);
    }
  },

  getUser(): any {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser(user: any): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user info', e);
    }
  },

  getPendingPhone(): string {
    try {
      return localStorage.getItem(PHONE_KEY) || '12345 67890';
    } catch {
      return '12345 67890';
    }
  },

  setPendingPhone(phone: string): void {
    try {
      localStorage.setItem(PHONE_KEY, phone);
    } catch (e) {
      console.warn('Failed to save pending phone', e);
    }
  },

  // Display mode saved after login: "api" (live data) or "figma" (sample content).
  getMode(): string | null {
    try {
      return localStorage.getItem(MODE_KEY);
    } catch {
      return null;
    }
  },

  setMode(mode: string): void {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch (e) {
      console.warn('Failed to save display mode', e);
    }
  },

  removeMode(): void {
    try {
      localStorage.removeItem(MODE_KEY);
    } catch (e) {
      console.warn('Failed to remove display mode', e);
    }
  },
};
