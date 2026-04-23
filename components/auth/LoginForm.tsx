import { Pressable, Text, View } from "react-native";

import AppInput from "@/components/auth/AppInput";
import AppButton from "@/components/ui/AppButton";
import Checkbox from "@/components/ui/Checkbox";
import SocialButton from "@/components/ui/SocialButton";

type LoginFormProps = {
  email: string;
  password: string;
  rememberMe: boolean;
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onToggleRememberMe: () => void;
  onForgotPassword: () => void;
  onSubmit: () => void;
  onPressRegister: () => void;
};

export default function LoginForm({
  email,
  password,
  rememberMe,
  onChangeEmail,
  onChangePassword,
  onToggleRememberMe,
  onForgotPassword,
  onSubmit,
  onPressRegister,
}: LoginFormProps) {
  return (
    <View className="mt-4">
      <AppInput
        label="Email Address"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon="email-outline"
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry
        leftIcon="lock-outline"
        isPassword
      />

      <View className="mt-4 flex-row items-center justify-between">
        <Checkbox
          label="Remember Me"
          checked={rememberMe}
          onPress={onToggleRememberMe}
        />

        <Pressable onPress={onForgotPassword}>
          <Text className="text-caption font-medium text-neutral-700">
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <AppButton
        title="Sign In"
        onPress={onSubmit}
        className="mt-5"
      />

      <View className="my-5 flex-row items-center">
        <View className="h-px flex-1 bg-neutral-300" />
        <Text className="mx-3 text-bodySm text-neutral-600">
          Or log in with
        </Text>
        <View className="h-px flex-1 bg-neutral-300" />
      </View>

      <SocialButton
        title="Sign in with Google"
        imageSource={require("../../assets/images/google_logo.png")}
      />

      <View className="mt-6 flex-row items-center justify-center gap-1">
        <Text className="text-caption text-neutral-500">
          Don't have an account?
        </Text>

        <Pressable onPress={onPressRegister} hitSlop={5}>
          <Text className="text-caption font-semibold text-primary">
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}