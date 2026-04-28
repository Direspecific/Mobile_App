import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ProfileCard() {
  return (
    <View className="mt-3 rounded-card border border-primary-muted bg-primary-pale px-4 py-4 shadow-md">
      <View className="flex-row items-center">
        <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Ionicons name="shield-outline" size={32} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-body font-bold text-neutral-900">
            C8nnect
          </Text>

          <Text className="mt-1 text-caption text-neutral-600">
            helloC8nnect@gmail.com
          </Text>

          <View className="mt-1 flex-row items-center">
            <View className="mr-1 h-2 w-2 rounded-full bg-success" />

            <Text className="text-caption text-success">
              Verified Account
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}