import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
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
            LOGIN
          </Text>
   
        </View>
      </View>
    </SafeAreaView>
  );
} 