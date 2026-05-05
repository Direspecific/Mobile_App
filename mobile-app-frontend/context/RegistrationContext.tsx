import { createContext, useContext, useState } from "react";

type RegistrationStatus = "unregistered" | "pending" | "approved";

type RegistrationContextType = {
  status: RegistrationStatus;
  setStatus: (status: RegistrationStatus) => void;
};

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<RegistrationStatus>("unregistered");

  return (
    <RegistrationContext.Provider value={{ status, setStatus }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error("useRegistration must be used within a RegistrationProvider");
  return context;
}