import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert } from "react-native";

import AuthForm from "@/components/auth/AccountCreation";
import AuthScreenWrapper from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/ui/Header";
import { useRegistration } from "@/context/RegistrationContext";
import { registerAccount } from "@/services/api";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setStatus, setAccountProfile } = useRegistration();

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password) {
      Alert.alert("Missing details", "Please complete all account fields.");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Terms required", "Please accept the terms before continuing.");
      return;
    }

    try {
      setLoading(true);
      const user = await registerAccount(email.trim(), password);

      setUser({
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      setAccountProfile({
        fullName: fullName.trim(),
        phone: phoneNumber.trim(),
      });
      setStatus(user.status);

      router.push({
        pathname: "/verification",
        params: { email: user.email },
      });
    } catch (error) {
      Alert.alert(
        "Registration failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenWrapper>
      <StatusBar style="dark" />

      <AuthHeader
        title="Create Account"
        variant="register"
        showBackButton
        onBackPress={() => router.back()}
      />

      <AuthForm
        fullName={fullName}
        email={email}
        phoneNumber={phoneNumber}
        password={password}
        agreeTerms={agreeTerms}
        onChangeFullName={setFullName}
        onChangeEmail={setEmail}
        onChangePhoneNumber={setPhoneNumber}
        onChangePassword={setPassword}
        onToggleTerms={() => setAgreeTerms((prev) => !prev)}
        onSubmit={handleRegister}
        loading={loading}
      />
    </AuthScreenWrapper>
  );
}
