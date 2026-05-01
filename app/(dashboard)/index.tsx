import { View, Text, Image, ScrollView, Pressable  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusCard from "../components/StatusCard";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Home() {
  const logo = require("../../assets/images/favicon.png");

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
          <Image source={logo} className="w-12 h-12 rounded-full mr-6 border"/>
        </SafeAreaView>

        <StatusCard
          logo={logo}
          label="Registration Status"
          footer="Registration open Until April 25, 2026"
        />

        <Text className="pl-4 text-lg font-bold">
          Your Voting Location
        </Text>

        <StatusCard
          logo={logo}
          label="Registration Status"
          footer="Registration open Until April 25, 2026"
        />

        <Text className="pl-4 text-lg font-bold">
          Upcoming Election
        </Text>

        <StatusCard
          logo={logo}
          status="Primary Election"
          label="Election Status"
          footer="Election starts at April 25, 2026"
        />

        <Text className="pl-4 text-lg font-bold">
          View Status
        </Text>

        <View className="flex-row px-6 mt-4 gap-4">
          <View className="flex-1 border p-8 rounded-xl items-center justify-center">
            <Image source={logo} className="w-12 h-12 rounded-lg mb-2 border"/>
            <Text className="text-center">Update Profile</Text>
          </View>

          <View className="flex-1 border p-8 rounded-xl items-center justify-center">
            <Image source={logo} className="w-12 h-12 rounded-lg mb-2 border"/>
            <Text className="text-center">View Status</Text>
          </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}