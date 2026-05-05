import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppInput from "@/components/auth/AppInput";
import AppButton from "@/components/ui/AppButton";
import AuthHeader from "@/components/ui/Header";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  const handleSendCode = () => {
    if (!isValidEmail) return;

    router.push({
      pathname: "/verification",
      params: { flow: "forgot-password" },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      <View className="flex-1 px-screen pt-10">
        <AuthHeader
          title="Forgot Password"
          subtitleLines={[
            "Enter your email address and we’ll",
            "send you a verification code to reset your password.",
          ]}
          showBackButton={false}
          variant="login"
        />

        <View className="mt-10">
          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="email-outline"
          />

          <AppButton
            title="Send OTP"
            onPress={handleSendCode}
            disabled={!isValidEmail}
            className={`mt-5 ${!isValidEmail ? "opacity-50" : ""}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}