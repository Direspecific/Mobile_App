import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      <View className="flex-1 px-screen pt-16 pb-8">
        <View className="flex-1 justify-center">
          <Text className="text-center text-h1 text-neutral-900">
            Welcome Back
          </Text>

          <Text className="mt-10 text-center text-body text-neutral-600">
            Sign in to access your dashboard and
          </Text>
          <Text className="text-center text-body text-neutral-600">
            manage voter registrations
          </Text>

          <View className="mt-10">
            <Text className="mb-2 text-bodySm text-neutral-600">
              Email Address
            </Text>

            <View className="flex-row items-center rounded-button border border-neutral-300 bg-background px-4 py-3">
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#949CA3"
              />
              <TextInput
                className="ml-3 flex-1 text-body text-neutral-900"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-bodySm text-neutral-600">Password</Text>

            <View className="flex-row items-center rounded-button border border-neutral-300 bg-background px-4 py-3">
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#949CA3"
              />
              <TextInput
                className="ml-3 flex-1 text-body text-neutral-900"
                secureTextEntry
              />
              <Ionicons name="eye-outline" size={20} color="#949CA3" />
            </View>
          </View>

          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="h-3.5 w-3.5 bg-neutral-700" />
              <Text className="ml-2 text-caption text-neutral-500">
                Remember Me
              </Text>
            </View>

            <Pressable>
              <Text className="text-caption font-medium text-neutral-700">
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <Pressable className="mt-5 rounded-full bg-primary py-4">
            <Text className="text-center text-body font-semibold text-white">
              Sign in
            </Text>
          </Pressable>

          <View className="my-6 flex-row items-center">
            <View className="h-[1px] flex-1 bg-neutral-300" />
            <Text className="mx-3 text-caption text-neutral-500">
              Or log in with
            </Text>
            <View className="h-[1px] flex-1 bg-neutral-300" />
          </View>

          <Pressable className="flex-row items-center justify-center rounded-full bg-surface py-4">
            <Image
              source={require("../assets/images/google_logo.png")}
              className="mr-2 h-5 w-5"
              resizeMode="contain"
            />
            <Text className="text-body text-neutral-700">
              Sign in with Google
            </Text>
          </Pressable>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-caption text-neutral-500">
              Don't have an Account?
            </Text>
           <Pressable onPress={() => router.push("/register")}>
            <Text className="text-caption font-semibold text-primary">
              {" "}Create Account?
            </Text>
           </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}