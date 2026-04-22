import { Image } from "expo-image";
import { Text, View } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitleLines?: string[];
};

const LOGO_SIZE = 150;

export default function AuthHeader({
  title,
  subtitleLines = [],
}: AuthHeaderProps) {
  return (
    <View className="items-center px-4">
      <Image
        source={require("@/assets/images/votelec.png")}
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
        contentFit="contain"
      />

      <Text className="mt-1 text-center text-h1 text-neutral-900">
        {title}
      </Text>

      {subtitleLines.map((line, index) => (
        <Text
          key={index}
          className={`text-center text-body text-neutral-600 ${
            index === 0 ? "mt-2" : ""
          }`}
        >
          {line}
        </Text>
      ))}
    </View>
  );
}