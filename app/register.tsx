import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthScreenWrapper from "@/components/auth/AuthScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import Checkbox from "@/components/ui/Checkbox";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [termsError, setTermsError] = useState<string>("");

  const validateForm = (): boolean => {
    let isValid = true;

    setFullNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setTermsError("");

    if (!fullName.trim()) {
      setFullNameError("Full name is required.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required.");
      isValid = false;
    } else if (!/^[0-9+\-()\s]{7,15}$/.test(phoneNumber)) {
      setPhoneError("Please enter a valid phone number.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    if (!agreeTerms) {
      setTermsError("You must agree to the Terms of Service and Privacy Policy.");
      isValid = false;
    }

    return isValid;
  };

  const handleSendOtp = (): void => {
    const isValid = validateForm();

    if (!isValid) return;


    
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

      <View className="mt-4">
  <AppInput
    label="Full Name"
    value={fullName}
    onChangeText={(text) => {
      setFullName(text);
      if (fullNameError) setFullNameError("");
    }}
    leftIcon="account-outline"
    error={fullNameError}
  />

  <AppInput
    label="Email Address"
    value={email}
    onChangeText={(text) => {
      setEmail(text);
      if (emailError) setEmailError("");
    }}
    keyboardType="email-address"
    autoCapitalize="none"
    leftIcon="email-outline"
    error={emailError}
  />

  <AppInput
    label="Phone Number"
    value={phoneNumber}
    onChangeText={(text) => {
      setPhoneNumber(text);
      if (phoneError) setPhoneError("");
    }}
    keyboardType="phone-pad"
    leftIcon="phone-outline"
    error={phoneError}
  />

  <AppInput
    label="Password"
    value={password}
    onChangeText={(text) => {
      setPassword(text);
      if (passwordError) setPasswordError("");
    }}
    secureTextEntry
    leftIcon="lock-outline"
    isPassword
    error={passwordError}
  />
        <View className="mt-1 rounded-md border border-neutral-300 bg-surface px-4 py-6">
          <Text className="text-center text-bodySm text-neutral-500">
            reCAPTCHA placeholder
          </Text>
        </View>
        
        <View className="mt-4">
          <Checkbox 
            label="I agree to the Terms of Service and Privacy Policy"
            checked={agreeTerms}
            onPress={() => setAgreeTerms(!agreeTerms)}
         
          />
        </View>
          {!!termsError && (
            <Text className="mt-1 text-caption text-error">{termsError}</Text>
          )}
            // foccing button
          <AppButton title="Send OTP" onPress={handleSendOtp} className="mt-6" />
          
        </View>
    </AuthScreenWrapper>
  );
}