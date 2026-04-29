import React from "react";
import LogoPanel from "../components/LogoPanel"
import LoginCard from "../components/LoginCard"
import "../styles/LoginPage.css"

const LoginPage: React.FC = () => {
  return (
    <main className="login-page">
      <LogoPanel />
      <LoginCard />
    </main>
  );
};

export default LoginPage;
