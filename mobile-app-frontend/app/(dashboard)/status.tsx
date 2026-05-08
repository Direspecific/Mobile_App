import { View, Text, ScrollView } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusCard from "../components/StatusCard";
import { Ionicons } from "@expo/vector-icons";

type TimelineItem = {
  title: string;
  date: string;
  description: string;
  completed: boolean;
};

const TIMELINE: TimelineItem[] = [
  {
    title: "Registration Submitted",
    date: "April 15, 2026 at 10:30 AM",
    description: "Your registration form has been submitted successfully",
    completed: true,
  },
  {
    title: "Documents Verified",
    date: "April 16, 2026 at 3:00 PM",
    description: "All required documents have been verified",
    completed: true,
  },
  {
    title: "Pending Approval",
    date: "Awaiting",
    description: "Your application is currently under review",
    completed: false,
  },
];

export default function Status() {
  const logo = require("../../assets/images/favicon.png");

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]}>
        <View className="p-4">
          <Text className="text-lg font-bold text-blue-500">Voter Status</Text>
          <Text className="text-sm text-gray-500">
            Track your registration progress
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 48 }}>
        <StatusCard
          label="Current Status"
          footer="Complete your registration to become eligible"
        />

        <Text className="pl-4 text-lg font-bold mb-2">
          Registration Timeline
        </Text>

        <View className="px-4">
          {TIMELINE.map((item, index) => (
            <View key={index} className="flex-row">
              {/* Left column - icon + line */}
              <View className="items-center mr-3">
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    item.completed ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <Ionicons
                    name={item.completed ? "checkmark" : "time-outline"}
                    size={18}
                    color="#fff"
                  />
                </View>
                {index < TIMELINE.length - 1 && (
                  <View className="w-0.5 flex-1 bg-gray-200 my-1" />
                )}
              </View>

              {/* Right column - card */}
              <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-1">
                  {item.title}
                </Text>
                <View className="flex-row items-center mb-1.5 gap-1">
                  <Ionicons name="calendar-outline" size={12} color="#9ca3af" />
                  <Text className="text-xs text-gray-400">{item.date}</Text>
                </View>
                <Text className="text-xs text-gray-500">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}