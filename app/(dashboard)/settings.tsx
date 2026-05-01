import { View, Text } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Settings() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center">
        <Text>Settings Screen</Text>
      </View>
    </ScreenWrapper>
  );
}