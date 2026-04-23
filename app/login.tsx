import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // validation + backend call
  };

  return (
    <AuthLayout>
      <StatusBar style="dark" />

      <AuthHeader
        title="Welcome Back"
        variant="login"
        subtitleLines={[
          "Sign in to access your dashboard and",
          "manage voter registrations",
        ]}
        subtitleSpacingClassName="mt-20"
      />

      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onToggleRememberMe={() => setRememberMe((prev) => !prev)}
        onForgotPassword={() => router.push("/forgotpassword")}
        onSubmit={handleLogin}
        onPressRegister={() => router.push("/register")}
      />
    </AuthLayout>
  );
}