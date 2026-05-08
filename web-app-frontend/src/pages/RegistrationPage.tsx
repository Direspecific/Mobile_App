import React from "react";
import LogoPanel from "../components/LogoPanel";
import RegistrationCard from "../components/RegistrationCard";
import "../styles/RegistrationCard.css"; 

const RegistrationPage: React.FC = () => {
  return (
    <main className="login-page">
      <LogoPanel />
      <RegistrationCard />
    </main>
  );
};

export default RegistrationPage;
