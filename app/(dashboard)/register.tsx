import { useRouter } from "expo-router";
import { View, Text, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Register() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <SafeAreaView className="flex-row items-center justify-between" edges={['top']}>
          <View className="p-4">
            <Text className="text-lg font-bold text-blue-500">
              Register Voter
            </Text>
            <Text className="text-sm text-gray-500">
              Add as new voter to the system
            </Text>
          </View>
        </SafeAreaView>

        <Pressable
          onPress={() => router.push("/registration-form")}
          className="bg-blue-500 p-4 rounded-full mx-4 mt-4"
        >
          <Text className="text-white text-center font-semibold">
            Register
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}