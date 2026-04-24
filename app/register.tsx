import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import AuthForm from "@/components/auth/AccountCreation";
import AuthScreenWrapper from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/ui/Header";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = () => {
    // backend - validation / API / OTP logic here
    router.push("/verification");
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