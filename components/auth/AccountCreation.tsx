import { useState } from "react";
import { Text, View } from "react-native";

import AppInput from "@/components/auth/AppInput";
import TermsandAgreement from "@/components/auth/TermsModal";
import AppButton from "@/components/ui/AppButton";
import Checkbox from "@/components/ui/Checkbox";
import RecaptchaBox from "@/components/ui/RecaptchaBox";

type RegisterFormProps = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeTerms: boolean;
  onChangeFullName: (text: string) => void;
  onChangeEmail: (text: string) => void;
  onChangePhoneNumber: (text: string) => void;
  onChangePassword: (text: string) => void;
  onToggleTerms: () => void;
  onSubmit: () => void;
};

export default function RegisterForm({
  fullName,
  email,
  phoneNumber,
  password,
  agreeTerms,
  onChangeFullName,
  onChangeEmail,
  onChangePhoneNumber,
  onChangePassword,
  onToggleTerms,
  onSubmit,
}: RegisterFormProps) {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleCheckboxPress = () => {
    if (agreeTerms) {
      onToggleTerms();
      return;
    }

    setShowTermsModal(true);
  };

  const handleAgreeTerms = () => {
    setShowTermsModal(false);

    if (!agreeTerms) {
      onToggleTerms();
    }
  };

  return (
    <View className="mt-4">
      <AppInput
        label="Full Name"
        value={fullName}
        onChangeText={onChangeFullName}
        leftIcon="account-outline"
      />

      <AppInput
        label="Email Address"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon="email-outline"
      />

      <AppInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={onChangePhoneNumber}
        keyboardType="phone-pad"
        leftIcon="phone-outline"
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry
        leftIcon="lock-outline"
        isPassword
      />

      <RecaptchaBox />

      <View className="mt-4 flex-row items-start">
        <Checkbox label="" checked={agreeTerms} onPress={handleCheckboxPress} />

        <Text
          onPress={() => setShowTermsModal(true)}
          className="ml-2 flex-1 text-bodySm text-neutral-600"
        >
          I agree to the{" "}
          <Text className="font-semibold text-primary">
            Terms of Service and Privacy Policy
          </Text>
        </Text>
      </View>

      <TermsandAgreement
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAgree={handleAgreeTerms}
      />

      <AppButton
        title="Send OTP"
        onPress={onSubmit}
        disabled={!agreeTerms}
        className={`mt-4 ${!agreeTerms ? "opacity-50" : ""}`}
      />
    </View>
  );
}