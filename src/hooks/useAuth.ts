import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(storage.getToken());
  const [user, setUserState] = useState<any>(storage.getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setTokenState(storage.getToken());
      setUserState(storage.getUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loginWithToken = (newToken: string, userData?: any) => {
    storage.setToken(newToken);
    setTokenState(newToken);
    if (userData) {
      storage.setUser(userData);
      setUserState(userData);
    }
  };

  const logout = () => {
    storage.removeToken();
    storage.removeMode();
    setTokenState(null);
    setUserState(null);
  };

  return {
    isAuthenticated: !!token,
    token,
    user: user || { name: 'Karan', phone: storage.getPendingPhone() },
    loginWithToken,
    logout,
  };
}
