import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OtpInput from "@/components/auth/OtpInput";
import OtpSuccessModal from "@/components/auth/OtpSuccessModal";
import AppButton from "@/components/ui/AppButton";

export default function Verification() {
  const { flow } = useLocalSearchParams<{ flow?: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isForgotPassword = flow === "forgot-password";
  const isComplete = otp.every((digit) => digit !== "");

  const handleSubmit = () => {
    if (!isComplete) return;

    if (isForgotPassword) {
      router.push("/newpassword");
      return;
    }

    setShowRegisterModal(true);
  };

  const handleRegisterConfirm = () => {
    setShowRegisterModal(false);
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FF]">
      <StatusBar style="dark" />

      <View className="flex-1 px-5 pt-28">
        <Text className="text-center text-h1 font-bold text-neutral-900">
          Verify Your Phone
        </Text>

        <Text className="mt-4 text-center text-bodySm leading-6 text-neutral-600">
          We've sent a 6-digit code to your Email{"\n"}
          and Number. Enter it below.
        </Text>

        <View className="mt-7">
          <Text className="mb-2 text-bodySm text-neutral-600">
            Enter OTP Code
          </Text>

          <OtpInput value={otp} onChange={setOtp} />
        </View>

        <AppButton
          title="Submit"
          onPress={handleSubmit}
          disabled={!isComplete}
          className={`mt-4 ${!isComplete ? "opacity-50" : ""}`}
        />
      </View>

      <OtpSuccessModal
        visible={showRegisterModal}
        onConfirm={handleRegisterConfirm}
      />
    </SafeAreaView>
  );
}