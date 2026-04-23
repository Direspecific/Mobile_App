import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function RecaptchaBox() {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => setChecked((prev) => !prev)}
      className="mt-1 flex-row items-center rounded-md border border-neutral-300 bg-surface px-4 py-3 active:opacity-70"
    >
      <View className="mr-3">
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
          size={30}
          color="#6A7178"
        />
      </View>

      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-bodySm text-neutral-700">
          I’m not a robot
        </Text>

        <Image
          source={require("../../assets/images/reCAPTCHA.png")}
          style={{ width: 90, height: 60 }}
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}