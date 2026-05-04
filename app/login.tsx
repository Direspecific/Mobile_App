import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthScreenWrapper from "@/components/auth/AuthScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import Checkbox from "@/components/ui/Checkbox";
import SocialButton from "@/components/ui/SocialButton";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = (): void => {
    // validation + backend call
  };

  return (
    <AuthScreenWrapper>
      <StatusBar style="dark" />

      <AuthHeader
        title="Welcome Back"
        variant="login"
        subtitleLines={[
          "Sign in to access your dashboard and",
          "manage voter registrations",
     ]}
      subtitleSpacingClassName="mt-20"
/>

      <View className="mt-4">
        <AppInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="email-outline"
        />

        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock-outline"
          isPassword
        />
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <Checkbox
          label="Remember Me"
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        />

        <Pressable onPress={() => router.push("/onboarding_2")}>
          <Text className="text-caption font-medium text-neutral-700">
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <AppButton title="Sign In" onPress={() => router.push("./(dashboard)")} className="mt-5" />

      <View className="my-5 flex-row items-center">
        <View className="h-px flex-1 bg-neutral-300" />
        <Text className="mx-3 text-bodySm text-neutral-600">
          Or log in with
        </Text>
        <View className="h-px flex-1 bg-neutral-300" />
      </View>

      <SocialButton
        title="Sign in with Google"
        imageSource={require("../assets/images/google_logo.png")}
      />

      <AuthFooter
        text="Don't have an account?"
        actionText="Create Account"
        onPress={() => router.push("/register")}
      />
    </AuthScreenWrapper>
  );
}