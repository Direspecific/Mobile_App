import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OtpInput from "@/components/auth/OtpInput";
import OtpSuccessModal from "@/components/auth/OtpSuccessModal";
import AppButton from "@/components/ui/AppButton";
import { useRegistration } from "@/context/RegistrationContext";
import { resendOtp, verifyOtp } from "@/services/api";

export default function Verification() {
  const { flow, email: emailParam } = useLocalSearchParams<{
    flow?: string;
    email?: string;
  }>();
  const { user } = useRegistration();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isForgotPassword = flow === "forgot-password";
  const email = (emailParam || user?.email || "").trim();
  const isComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async () => {
    if (!isComplete) return;

    if (isForgotPassword) {
      router.push("/newpassword");
      return;
    }

    if (!email) {
      Alert.alert("Missing email", "Please go back and enter your email again.");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyOtp(email, otp.join(""));

      setShowRegisterModal(true);
    } catch (error) {
      Alert.alert(
        "Invalid OTP",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      Alert.alert("Missing email", "Please go back and enter your email again.");
      return;
    }

    try {
      setIsResending(true);
      await resendOtp(email);
      setOtp(["", "", "", "", "", ""]);
      Alert.alert("OTP sent", "Please check your email for the new code.");
    } catch (error) {
      Alert.alert(
        "Unable to resend OTP",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsResending(false);
    }
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
          We have sent a 6-digit code to your email{"\n"}
          {email || "address"}. Enter it below.
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
          loading={isSubmitting}
          className={`mt-4 ${!isComplete ? "opacity-50" : ""}`}
        />

        {!isForgotPassword ? (
          <Pressable
            onPress={!isResending ? handleResendOtp : undefined}
            disabled={isResending}
            className="mt-4 items-center"
          >
            <Text className="text-bodySm font-semibold text-primary">
              {isResending ? "Sending..." : "Resend OTP"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <OtpSuccessModal
        visible={showRegisterModal}
        onConfirm={handleRegisterConfirm}
      />
    </SafeAreaView>
  );
}
