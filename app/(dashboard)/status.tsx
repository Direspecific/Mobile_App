import { View, Text } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Status() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center">
        <Text>Status Screen</Text>
      </View>
    </ScreenWrapper>
  );
}