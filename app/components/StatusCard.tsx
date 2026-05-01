import React from "react";
import { View, Text, Image } from "react-native";
import { useRegistration } from "@/context/RegistrationContext";

type Props = {
  logo: any;
  status?: string;
  label?: string;
  footer?: string;
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

export default function StatusCard({ logo, status, label, footer }: Props) {
  const { status: registrationStatus } = useRegistration();
  const colors = colorMap[registrationStatus];

  return (
    <View style={{
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.bg,
      padding: 16,
      marginHorizontal: 24,
      marginVertical: 16,
      gap: 16,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={logo} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 24, borderWidth: 1, borderColor: "#e5e7eb" }} />
        <View>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
            {status ?? statusLabel[registrationStatus]}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            {label}
          </Text>
        </View>
      </View>
      {footer && (
        <Text style={{ fontSize: 14, color: "#4b5563" }}>
          {footer}
        </Text>
      )}
    </View>
  );
}