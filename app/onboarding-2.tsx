import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      <View className="flex-1 px-screen pb-10">
       
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../assets/images/compass.png")}
            className="mb-8 h-56 w-56"
            resizeMode="contain"
          />

          <Text className="text-h1 font-semibold text-center text-neutral-900">
            Make a Change
          </Text>

          <Text className="mt-5 max-w-[300px] text-center text-body text-neutral-600">
            Begin your path toward making an impact. Discover how your voice and
            actions can help shape the future around you.
          </Text>

          <View className="mt-10 flex-row items-center">
             <Pressable onPress={() => router.push("/")}>
            <View className="h-4 w-4 rounded-full bg-neutral-300" />
             </Pressable>
            <View className="mx-3 h-4 w-8 rounded-full bg-primary" /> 
              <Pressable onPress={() => router.push("/onboarding-3")}>
            <View className="h-4 w-4 rounded-full bg-neutral-300" />
             </Pressable>
          </View>
        </View>

      
        <View className="w-full flex-row">
          <Pressable className="mr-2 flex-1 rounded-full bg-primary py-4">
            <Text className="text-center text-body text-surface">Skip</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/onboarding-3")}
            className="ml-2 flex-1 rounded-full bg-secondary py-4"
          > 
            <Text className="text-center text-body text-neutral-900">
              Next ›
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}