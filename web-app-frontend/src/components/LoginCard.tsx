import React, { useState } from "react";
import InputField from "./InputField"
import CheckboxField from "./CheckboxField";
import LoginButton from "./LoginButton"
import "../styles/LoginCard.css"

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);

    // Replace with real auth logic
    if (email !== "admin@example.com") {
      setError("Invalid email or password.");
    } else {
      alert("Login successful!");
    }
  };

  return (
    <section className="login-card" aria-label="Admin Login Form">
      <div className="login-card__glow" aria-hidden="true" />
      <h1 className="login-card__title">ADMIN LOGIN</h1>

      <form className="login-card__form" onSubmit={handleSubmit} noValidate>
        <InputField
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(val) => setEmail(val)}
          autoComplete="email"
          aria-label="Email address"
        />
        <InputField
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(val) => setPassword(val)}
          autoComplete="current-password"
          aria-label="Password"
        />

        <div className="login-card__meta">
          <CheckboxField
            label="Remember Me"
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <button
            type="button"
            className="login-card__forgot"
            onClick={() => alert("Password reset coming soon.")}
          >
            Forgot Password?
          </button>
        </div>

        {error && (
          <p className="login-card__error" role="alert">{error}</p>
        )}

        <LoginButton loading={loading} />
      </form>

      <p className="login-card__register">
        Don't have an account?{" "}
        <button
          type="button"
          className="login-card__register-link"
          onClick={() => alert("Registration request coming soon.")}
        >
          request to be registered now
        </button>
      </p>
    </section>
  );
};

export default LoginCard;
