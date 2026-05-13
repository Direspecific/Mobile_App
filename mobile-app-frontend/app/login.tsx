import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import AuthHeader from "@/components/ui/Header";
import { useRegistration } from "@/context/RegistrationContext";
import { loginAccount } from "@/services/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useRegistration();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginAccount(email.trim(), password);

      setAuth(response.token, {
        id: response.userId,
        email: response.email,
        role: response.role,
        status: response.status,
      });

      router.replace("/(dashboard)");
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
        loading={loading}
      />
    </AuthLayout>
  );
}
