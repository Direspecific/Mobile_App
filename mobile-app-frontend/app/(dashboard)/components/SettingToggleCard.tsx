import React from "react";
import { Pressable, Text, View } from "react-native";

type SettingToggleCardProps = {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function SettingToggleCard({
  title,
  subtitle,
  value,
  onValueChange,
}: SettingToggleCardProps) {
  return (
    <View className="mb-3 flex-row items-center rounded-[20px] border border-border bg-white px-4 py-3 shadow-sm">
  
      <View className="flex-1 pr-3">
        <Text className="text-bodySm font-semibold text-neutral-900">
          {title}
        </Text>

        {subtitle ? (
          <Text className="mt-1 text-caption italic text-neutral-500">
            {subtitle}
          </Text>
        ) : null}
      </View>

  
      <Pressable
        onPress={() => onValueChange(!value)}
        className={`h-[46px] w-[82px] rounded-full p-[5px] ${
          value ? "bg-primary" : "bg-[#EEF4FF]"
        }`}
      >
        <View
          className={`h-9 w-9 rounded-full bg-white shadow-md ${
            value ? "self-end" : "self-start"
          }`}
        />
      </Pressable>
    </View>
  );
}