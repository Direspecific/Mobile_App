import React from "react";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  label: string;
  onPress?: () => void;
  color?: string;
};

export default function PressableCard({ icon, name, label, onPress, color = "#6b7280" }: Props) {
  return (
    <Pressable
      onPress={onPress ?? (() => {})}
      className="border border-gray-200 bg-white px-4 py-4 mx-6 my-2 rounded-xl active:bg-gray-100 shadow-lg"
    >
      <View className="flex-row items-center gap-4">
        <View
          className="w-12 h-12 rounded-lg border items-center justify-center"
          style={{
            backgroundColor: color + "22",
            borderColor: color + "44",
          }}
        >
          <Ionicons name={icon} size={26} color={color} />
        </View>
        <View>
          <Text className="text-lg font-bold text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-500">{label}</Text>
        </View>
      </View>
    </Pressable>
  );
}