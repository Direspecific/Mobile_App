import React from "react";
import { View, Text, Image } from "react-native";

type Props = {
  logo: any;
  status?: string;
  label?: string;
  footer?: string;
  variant?: "default" | "success" | "pending" | "danger";
};

const colorMap = {
  default: {
    border: "border-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-50",
  },
  success: {
    border: "border-green-500",
    text: "text-green-500",
    bg: "bg-green-50",
  },
  pending: {
    border: "border-yellow-500",
    text: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  danger: {
    border: "border-red-500",
    text: "text-red-500",
    bg: "bg-red-50",
  },
};

export default function StatusCard({
  logo,
  status = "Not Verified",
  label,
  footer,
  variant = "default",
}: Props) {
  const colors = colorMap[variant];


  return (
    <View className={`border ${colors.border} ${colors.bg} p-4 pl-8 pr-8 m-6 mt-4 mb-4 gap-4 rounded-xl`}>
      <View className="flex-row items-center">
        <Image source={logo} className="w-12 h-12 rounded-lg mr-6 border"/>

        <View>
          <Text className={`${colors.text} text-lg font-bold text-blue-500`}>
            {status}
          </Text>
          <Text className="text-sm text-gray-500">
            {label}
          </Text>
        </View>
      </View>

      {footer && (
        <Text className="text-sm text-gray-600">
          {footer}
        </Text>
      )}
    </View>
  );
}