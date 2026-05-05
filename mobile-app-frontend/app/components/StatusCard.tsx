import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRegistration } from "@/context/RegistrationContext";

type StatusColors = {
  border?: string;
  text?: string;
  bg?: string;
};

type Props = {
  status?: string;
  label?: string;
  footer?: string;
  colors?: StatusColors;
  icon?: keyof typeof Ionicons.glyphMap;
};

const statusLabel = {
  unregistered: "Not Registered",
  pending: "Pending Approval",
  approved: "Approved",
};

const colorMap = {
  unregistered: { border: "#ef4444", text: "#ef4444", bg: "#fef2f2" },
  pending:      { border: "#eab308", text: "#eab308", bg: "#fefce8" },
  approved:     { border: "#22c55e", text: "#22c55e", bg: "#f0fdf4" },
};

const iconMap = {
  unregistered: "alert-circle-outline",
  pending: "time-outline",
  approved: "checkmark-circle-outline",
} as const;

export default function StatusCard({ status, label, footer, colors: colorOverrides, icon }: Props) {
  const { status: registrationStatus } = useRegistration();
  const colors = { ...colorMap[registrationStatus], ...colorOverrides };
  const resolvedIcon = icon ?? iconMap[registrationStatus];

  return (
    <View
      className="mx-6 my-4 p-4 gap-4 rounded-xl shadow-md"
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.bg,
      }}
    >
      <View className="flex-row items-center">
        {/* Icon circle */}
        <View
          className="w-12 h-12 rounded-lg items-center justify-center mr-6"
          style={{ backgroundColor: colors.border + "22" }}
        >
          <Ionicons name={resolvedIcon} size={28} color={colors.text} />
        </View>

        <View>
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            {status ?? statusLabel[registrationStatus]}
          </Text>
          <Text className="text-sm text-gray-500">{label}</Text>
        </View>
      </View>

      {footer && (
        <Text className="text-sm text-gray-600">{footer}</Text>
      )}
    </View>
  );
}