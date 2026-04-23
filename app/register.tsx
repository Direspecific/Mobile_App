import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthScreenWrapper from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/RegistrationForm";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = () => {
    // backend - validation / API / OTP logic here
    router.push("/onboarding_2");
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
      />
    </AuthScreenWrapper>
  );
}