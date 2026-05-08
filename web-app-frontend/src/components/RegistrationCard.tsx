import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import "../styles/RegistrationCard.css";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationCard: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1400));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="login-card reg-card" aria-label="Registration Success">
        <div className="login-card__glow" aria-hidden="true" />
        <div className="reg-card__success">
          <svg className="reg-card__success-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#5b6dcd" strokeWidth="3" opacity="0.3" />
            <path d="M18 32L28 42L46 22" stroke="#5b6dcd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="reg-card__success-title">Request Submitted!</h2>
          <p className="reg-card__success-body">
            Your registration request has been sent. An administrator will review and activate your account shortly.
          </p>
          <button className="reg-card__back-btn" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="login-card reg-card" aria-label="Admin Registration Form">
      <div className="login-card__glow" aria-hidden="true" />

      <div className="reg-card__header">
        <h1 className="login-card__title reg-card__title">
          ADMIN<br />REGISTRATION<br />REQUEST
        </h1>
        <div className="reg-card__divider" />
      </div>

      <form className="login-card__form" onSubmit={handleSubmit} noValidate>
        <InputField
          type="text"
          placeholder="Enter your Name"
          value={form.name}
          onChange={update("name")}
          autoComplete="name"
          aria-label="Full name"
        />
        <InputField
          type="email"
          placeholder="Enter your Email"
          value={form.email}
          onChange={update("email")}
          autoComplete="email"
          aria-label="Email address"
        />
        <InputField
          type="password"
          placeholder="Enter your Password"
          value={form.password}
          onChange={update("password")}
          autoComplete="new-password"
          aria-label="Password"
        />
        <InputField
          type="password"
          placeholder="Confirm your Password"
          value={form.confirmPassword}
          onChange={update("confirmPassword")}
          autoComplete="new-password"
          aria-label="Confirm password"
        />

        {error && (
          <p className="login-card__error" role="alert">{error}</p>
        )}

        <button
          type="submit"
          className={`login-btn reg-card__submit${loading ? " login-btn--loading" : ""}`}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span className="login-btn__spinner" aria-hidden="true" />
          ) : (
            "Request Registration Now"
          )}
        </button>
      </form>

      <p className="login-card__register">
        Already have an account?{" "}
        <button
          type="button"
          className="login-card__register-link"
          onClick={() => navigate("/login")}
        >
          login now
        </button>
      </p>
    </section>
  );
};

export default RegistrationCard;
