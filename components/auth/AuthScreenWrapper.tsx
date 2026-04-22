import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

export default function AuthScreenWrapper({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-screen pt-1 pb-8">
        {children}
      </View>
    </SafeAreaView>
  );
}