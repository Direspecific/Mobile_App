import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import LoginButton from "./LoginButton";
import "../styles/LoginCard.css";

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);

    // Demo: any credentials work — replace with real API call
    login({ name: "C8nnect", email });
    navigate("/dashboard");
  };

  return (
    <section className="login-card" aria-label="Admin Login Form">
      <div className="login-card__glow" aria-hidden="true" />
      <h1 className="login-card__title">ADMIN LOGIN</h1>
      <form className="login-card__form" onSubmit={handleSubmit} noValidate>
        <InputField type="email" placeholder="Enter your Email" value={email}
          onChange={setEmail} autoComplete="email" aria-label="Email address" />
        <InputField type="password" placeholder="Enter your Password" value={password}
          onChange={setPassword} autoComplete="current-password" aria-label="Password" />
        <div className="login-card__meta">
          <CheckboxField label="Remember Me" checked={rememberMe} onChange={setRememberMe} />
          <button type="button" className="login-card__forgot"
            onClick={() => alert("Password reset coming soon.")}>Forgot Password?</button>
        </div>
        {error && <p className="login-card__error" role="alert">{error}</p>}
        <LoginButton loading={loading} />
      </form>
      <p className="login-card__register">
        Don't have an account?{" "}
        <button type="button" className="login-card__register-link"
          onClick={() => navigate("/register")}>request to be registered now</button>
      </p>
    </section>
  );
};

export default LoginCard;