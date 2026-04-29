import React from "react";
import "../styles/LoginButton.css"

interface LoginButtonProps {
  loading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      className={`login-btn${loading ? " login-btn--loading" : ""}`}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? (
        <span className="login-btn__spinner" aria-hidden="true" />
      ) : (
        "Login Now"
      )}
    </button>
  );
};

export default LoginButton;
