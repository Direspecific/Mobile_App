import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Dimensions, Pressable, Text, View } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitleLines?: string[];
  showBackButton?: boolean;
  onBackPress?: () => void;
  subtitleSpacingClassName?: string;
  variant?: "login" | "register";
};

const { width } = Dimensions.get("window");
const LOGO_SIZE = 150;
const SIDE_SLOT_WIDTH = Math.max(48, width * 0.12);

export default function AuthHeader({
  title,
  subtitleLines = [],
  showBackButton = false,
  onBackPress,
  subtitleSpacingClassName = "mt-4",
  variant = "login",
}: AuthHeaderProps) {
  const isLogin = variant === "login";
  const isRegister = variant === "register";
  
  return (
    <View className="px-1">
      <View className="items-center -mt-2">
        <Image
          source={require("@/assets/images/votelec.png")}
          style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
          contentFit="contain"
        />
      </View>

      <View className="mt-1">
        <View className="flex-row items-center">
          <View
            style={{ width: SIDE_SLOT_WIDTH }}
            className="items-start justify-center"
          >
            {showBackButton && (
              <Pressable
                onPress={onBackPress}
                hitSlop={10}
                className="h-12 w-12 items-center justify-center rounded-full bg-primary"
              >
                <Entypo name="chevron-small-left" size={24} color="white" />
              </Pressable>
            )}
          </View>

          <View className="flex-1 items-center justify-center">
            <Text
              className={`font-extrabold text-neutral-800 ${
                isLogin ? "text-displayLg" : "text-h1"
              }`}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
            >
              {title}
            </Text>
          </View>

          <View style={{ width: SIDE_SLOT_WIDTH }} />
        </View>

        {subtitleLines.length > 0 && (
          <View className={subtitleSpacingClassName}>
            {subtitleLines.map((line, index) => (
              <Text
                key={`${line}-${index}`}
                className={`text-body text-neutral-600 ${
                  isLogin ? "text-center" : isRegister ? "text-left" : "text-center"
                }`}
              >
                {line}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}