import { useRegistration } from "@/context/RegistrationContext";
import { View } from "react-native";

const STATUS_BG = {
  unregistered: "#fff7ed",
  pending: "#fefce8",
  approved: "#f0fdf4",
};

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useRegistration();
  return (
    <View style={{ flex: 1, backgroundColor: STATUS_BG[status] }}>
      {children}
    </View>
  );
}