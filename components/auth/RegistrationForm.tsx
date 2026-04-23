import { View } from "react-native";

import AppInput from "@/components/auth/AppInput";
import RecaptchaBox from "@/components/auth/RecaptchaBox";
import AppButton from "@/components/ui/AppButton";
import Checkbox from "@/components/ui/Checkbox";

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

      <View className="mt-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreeTerms}
          onPress={onToggleTerms}
        />
      </View>

      <AppButton
        title="Send OTP"
        onPress={onSubmit}
        className="mt-6"
      />
    </View>
  );
}