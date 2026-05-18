import { View, Text, ScrollView } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusCard from "../components/StatusCard";
import { Ionicons } from "@expo/vector-icons";
import { useRegistration } from "@/context/RegistrationContext";

type TimelineItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Status() {
  const { status } = useRegistration();
  const timeline: TimelineItem[] = [
    {
      title: "Account Created",
      description: "Your account is ready for voter registration.",
      completed: true,
    },
    {
      title: "Registration Submitted",
      description:
        status === "unregistered"
          ? "Submit your voter registration form to continue."
          : "Your voter registration form has been submitted.",
      completed: status !== "unregistered",
    },
    {
      title: "Application Approved",
      description:
        status === "approved"
          ? "Your voter registration has been approved."
          : "Your application will be reviewed after submission.",
      completed: status === "approved",
    },
  ];

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
          footer={
            status === "unregistered"
              ? "Complete your registration to become eligible."
              : status === "pending"
                ? "Your application is currently under review."
                : "Your registration has been approved."
          }
        />

        <Text className="pl-4 text-lg font-bold mb-2">
          Registration Timeline
        </Text>

        <View className="px-4">
          {timeline.map((item, index) => (
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
                {index < timeline.length - 1 && (
                  <View className="w-0.5 flex-1 bg-gray-200 my-1" />
                )}
              </View>

              {/* Right column - card */}
              <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-1">
                  {item.title}
                </Text>
                <Text className="text-xs text-gray-500">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
