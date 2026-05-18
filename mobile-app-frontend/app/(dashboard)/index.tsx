import { View, Text, ScrollView  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusCard from "../components/StatusCard";
import ScreenWrapper from "../components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRegistration } from "@/context/RegistrationContext";

export default function Home() {
  const { accountProfile, status } = useRegistration();
  const greetingName = accountProfile?.fullName
    ? accountProfile.fullName.split(" ")[0]
    : "there";
  const statusFooter = {
    unregistered: "Start your voter registration when you are ready.",
    pending: "Your submitted registration is awaiting review.",
    approved: "Your voter registration has been approved.",
  };

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1">
        <SafeAreaView className="flex-row items-center justify-between" edges={['top']}>
          <View className="p-4">
            <Text className="text-lg font-bold text-blue-500">
              Welcome, {greetingName}
            </Text>
            <Text className="text-sm text-gray-500">
              Manage your voter registration
            </Text>
          </View>
          <View className="w-12 h-12 rounded-full mr-6 border border-gray-200 items-center justify-center bg-gray-100">
            <Ionicons name="person-outline" size={24} color="#6b7280" />
          </View>
        </SafeAreaView>

        <StatusCard
          label="Registration Status"
          footer={statusFooter[status]}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}
