import React, { useState, type ReactNode } from "react";
import { isAdminUser, type AuthUser } from "../services/api";
import { AuthContext } from "./AuthContext";

const AUTH_STORAGE_KEY = "votelec.auth";

function getStoredAuth() {
  const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!saved) {
    return { token: null, user: null };
  }

  try {
    const parsed = JSON.parse(saved) as { token?: string; user?: AuthUser };

    if (parsed.token && parsed.user && isAdminUser(parsed.user)) {
      return { token: parsed.token, user: parsed.user };
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return { token: null, user: null };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storedAuth] = useState(getStoredAuth);
  const [user, setUser] = useState<AuthUser | null>(storedAuth.user);
  const [token, setToken] = useState<string | null>(storedAuth.token);

  const login = (authToken: string, userData: AuthUser, remember = false) => {
    setToken(authToken);
    setUser(userData);

    if (remember) {
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ token: authToken, user: userData }),
      );
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
