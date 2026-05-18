import { createContext, useContext, useState } from "react";

import type { AuthUser, RegistrationStatus } from "@/services/api";

type AccountProfile = {
  fullName: string;
  phone: string;
};

type RegistrationContextType = {
  status: RegistrationStatus;
  token: string | null;
  user: AuthUser | null;
  accountProfile: AccountProfile | null;
  setStatus: (status: RegistrationStatus) => void;
  setAuth: (token: string, user: AuthUser) => void;
  setAccountProfile: (profile: AccountProfile | null) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<RegistrationStatus>("unregistered");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accountProfile, setAccountProfile] = useState<AccountProfile | null>(null);

  const setAuth = (nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken);
    setUser(nextUser);
    setStatus(nextUser.status);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAccountProfile(null);
    setStatus("unregistered");
  };

  return (
    <RegistrationContext.Provider
      value={{
        status,
        token,
        user,
        accountProfile,
        setStatus,
        setAuth,
        setAccountProfile,
        setUser,
        logout,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error("useRegistration must be used within a RegistrationProvider");
  return context;
}
