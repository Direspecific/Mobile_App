import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert } from "react-native";

import AuthForm from "@/components/auth/AccountCreation";
import AuthScreenWrapper from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/ui/Header";

type RegisterPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeTerms: boolean;
};

function validateRegisterForm(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  agreeTerms: boolean,
  recaptchaChecked: boolean
): RegisterPayload | null {
  const trimmedFullName = fullName.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPhone = phoneNumber.trim().replace(/\s+/g, "");

  if (!trimmedFullName) {
    Alert.alert("Missing Full Name", "Please enter your full name.");
    return null;
  }

  if (trimmedFullName.length < 2) {
    Alert.alert("Invalid Full Name", "Full name must be at least 2 characters.");
    return null;
  }

  if (!trimmedEmail) {
    Alert.alert("Missing Email", "Please enter your email address.");
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return null;
  }

  if (!trimmedPhone) {
    Alert.alert("Missing Phone Number", "Please enter your phone number.");
    return null;
  }

  const phoneRegex = /^09\d{9}$/;

  if (!phoneRegex.test(trimmedPhone)) {
    Alert.alert(
      "Invalid Phone Number",
      "Please enter a valid 11-digit phone number starting with 09."
    );
    return null;
  }

  if (!password) {
    Alert.alert("Missing Password", "Please enter your password.");
    return null;
  }

  if (/\s/.test(password)) {
    Alert.alert("Invalid Password", "Password must not contain spaces.");
    return null;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  if (!passwordRegex.test(password)) {
    Alert.alert(
      "Weak Password",
      "Password must be at least 8 characters and include at least 1 lowercase letter, 1 number, and 1 special character."
    );
    return null;
  }

  if (!recaptchaChecked) {
    Alert.alert(
      "Verification Required",
      "Please confirm that you are not a robot."
    );
    return null;
  }

  if (!agreeTerms) {
    Alert.alert(
      "Terms Required",
      "Please agree to the Terms of Service and Privacy Policy."
    );
    return null;
  }

  return {
    fullName: trimmedFullName,
    email: trimmedEmail,
    phoneNumber: trimmedPhone,
    password,
    agreeTerms,
  };
}

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (isSubmitting) return;

    const validatedData = validateRegisterForm(
      fullName,
      email,
      phoneNumber,
      password,
      agreeTerms,
      recaptchaChecked
    );

    if (!validatedData) return;

    try {
      setIsSubmitting(true);

      console.log("Validated registration data:", {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        agreeTerms: validatedData.agreeTerms,
      });

      router.push({
        pathname: "/verification",
        params: {
          email: validatedData.email,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      Alert.alert("Registration Error", message);
    } finally {
      setIsSubmitting(false);
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
        recaptchaChecked={recaptchaChecked}
        onChangeFullName={setFullName}
        onChangeEmail={setEmail}
        onChangePhoneNumber={setPhoneNumber}
        onChangePassword={setPassword}
        onToggleTerms={() => setAgreeTerms((prev) => !prev)}
        onChangeRecaptcha={setRecaptchaChecked}
        onSubmit={handleRegister}
      />
    </AuthScreenWrapper>
  );
}