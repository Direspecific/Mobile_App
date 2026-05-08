import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppInput from "@/components/auth/AppInput";
import { ResetPasswordSuccessModal } from "@/components/auth/OtpSuccessModal";
import AppButton from "@/components/ui/AppButton";
import AuthHeader from "@/components/ui/Header";

export default function NewPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isValid =
    password.trim().length >= 6 &&
    confirmPassword.trim().length >= 6 &&
    password === confirmPassword;

  const handleResetPassword = () => {
    if (!isValid) return;
    setShowSuccessModal(true);
  };

  const handleConfirm = () => {
    setShowSuccessModal(false);
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      <View className="flex-1 px-screen pt-10">
        <AuthHeader
          title="New Password"
          subtitleLines={[
            "Create a new password for your account.",
            "Make sure your password is secure.",
          ]}
          showBackButton={false}
          variant="login"
        />

        <View className="mt-10">
          <AppInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-outline"
            isPassword
          />

          <AppInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock-outline"
            isPassword
          />

          <AppButton
            title="Reset Password"
            onPress={handleResetPassword}
            disabled={!isValid}
            className={`mt-5 ${!isValid ? "opacity-50" : ""}`}
          />
        </View>
      </View>

      <ResetPasswordSuccessModal
        visible={showSuccessModal}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}