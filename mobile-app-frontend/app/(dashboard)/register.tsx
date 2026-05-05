import { useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { useRegistration } from "@/context/RegistrationContext";

const steps = [
  {
    step: "1",
    title: "Personal Information",
    description: "Full name, birthdate, birthplace, and civil status.",
  },
  {
    step: "2",
    title: "Address & Precinct",
    description: "Current residential address used to assign your precinct.",
  },
  {
    step: "3",
    title: "ID Upload & Submit",
    description: "A valid government-issued ID for identity verification.",
  },
];

const requirements = [
  "Valid government-issued ID (passport, driver's license, PhilSys)",
  "Proof of residence (utility bill, barangay certificate)",
  "Personal details (birthdate, address, civil status)",
];

export default function Register() {
  const router = useRouter();
  const { status } = useRegistration();
  
  return (
    <ScreenWrapper>
      <ScrollView className="flex-1">
        <SafeAreaView edges={["top"]}>
          <View className="p-4">
            <Text className="text-lg font-bold text-blue-500">
              Register Voter
            </Text>
            <Text className="text-sm text-gray-500">
              Add as new voter to the system
            </Text>
          </View>
        </SafeAreaView>

        {status === "unregistered" ? (
          <Pressable
            onPress={() => router.push("/registration-form")}
            className="bg-blue-500 p-4 rounded-full mx-4 mb-8 active:bg-blue-600"
          >
            <Text className="text-white text-center font-semibold">
              Start Registration
            </Text>
          </Pressable>
        ) : (
          <View className="mx-4 p-4 bg-green-50 border border-green-300 rounded-xl mb-8">
            <Text className="text-sm text-green-700 font-semibold text-center">
              ✓ You have already submitted a registration
            </Text>
          </View>
        )}

        {/* Deadline Banner */}
        <View className="mx-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
          <Text className="text-sm text-yellow-700 font-semibold">
            ⚠ Registration closes April 25, 2026
          </Text>
          <Text className="text-xs text-yellow-600 mt-1">
            Make sure to complete and submit before the deadline.
          </Text>
        </View>

        {/* Steps */}
        <Text className="pl-4 text-lg font-bold mt-6 mb-2">
          How It Works
        </Text>
        <View className="mx-4 gap-3">
          {steps.map((item) => (
            <View
              key={item.step}
              className="flex-row items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                <Text className="text-white font-bold text-sm">{item.step}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{item.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <Text className="pl-4 text-lg font-bold mt-6 mb-2">
          What to Prepare
        </Text>
        <View className="mx-4 p-4 bg-blue-50 border border-blue-200 rounded-xl gap-2 mb-4">
          {requirements.map((item, index) => (
            <View key={index} className="flex-row items-start gap-2">
              <Text className="text-blue-500 font-bold">•</Text>
              <Text className="text-sm text-gray-600 flex-1">{item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}