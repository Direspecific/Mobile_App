import { View, Text, ScrollView  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusCard from "../components/StatusCard";
import ScreenWrapper from "../components/ScreenWrapper";
import PressableCard from "../components/PressableCard";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <ScreenWrapper>
      <ScrollView className="flex-1">
        <SafeAreaView className="flex-row items-center justify-between" edges={['top']}>
          <View className="p-4">
            <Text className="text-lg font-bold text-blue-500">
              Welcome to TaSKReg!
            </Text>
            <Text className="text-sm text-gray-500">
              C8nnect IT Solutions
            </Text>
          </View>
          <View className="w-12 h-12 rounded-full mr-6 border border-gray-200 items-center justify-center bg-gray-100">
            <Ionicons name="person-outline" size={24} color="#6b7280" />
          </View>
        </SafeAreaView>

        <StatusCard
          label="Registration Status"
          footer="Registration open Until April 25, 2026"
        />

        {/* <Text className="pl-4 text-lg font-bold">
          Your Voting Location
        </Text>

        <StatusCard
          logo={logo}
          label="Registration Status"
          footer="Registration open Until April 25, 2026"
        /> */}

        <Text className="pl-4 text-lg font-bold mt-2 mb-2">Upcoming Election</Text>
        <StatusCard
          status="Primary Election"
          label="Election Status"
          footer="Election starts at April 25, 2026"
          colors={{ border: "#6366f1", text: "#4f46e5", bg: "#eef2ff" }}
        />

        <Text className="pl-4 text-lg font-bold mt-2 mb-2">Available Documents</Text>
        <PressableCard
          icon="document-text-outline"
          name="Registration Certificate"
          label="Issued April 20, 2025"
          color="#6366f1"
          onPress={() => {}}
        />
        <PressableCard
          icon="card-outline"
          name="Voter ID Card"
          label="Issued April 20, 2025"
          color="#22c55e"
          onPress={() => {}}
        />

      </ScrollView>
    </ScreenWrapper>
  );
}